import { Component } from '@angular/core';
import { AppService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'git-user-details';
  username: string;
  userDetails: any;
  userRepoDetails: any[];
  readmeDetails: any;
  readmeContent: any;
  public markdown = "# Markdown";
  showForm: boolean = true;
  showProjects: boolean = false;
  showReadmeContent: boolean = false;
  request = new XMLHttpRequest();

  constructor(private appService: AppService) { }

  searchUser() {
    this.appService.getUserData(this.username)
      .subscribe(
        userDetails => (this.userDetails = userDetails, this.getUserRepos())
      )
  }

  getUserRepos() {
    this.appService.getUserRepos(this.userDetails.repos_url)
      .subscribe(
        userRepoDetails => (this.userRepoDetails = userRepoDetails, this.showUserdetails())
      )
  }

  showUserdetails() {
    this.showForm = false;
    this.showProjects = true;
  }

  getReadme(repoUrl) {
    this.appService.getReadmeUrl(repoUrl)
      .subscribe(
        readmeDetails => (this.readmeDetails = readmeDetails, this.showReadme())
      )
  }

  showReadme() {
    this.showProjects = false;
    this.showReadmeContent = true;
    this.appService.getReadmeContent(this.readmeDetails.download_url)
    .subscribe(
      readmeContent => (this.readmeContent = readmeContent, this.markdown = this.readmeContent, console.log(readmeContent))
    )
    //const html = "<markdown [src]=\"\'" + this.readmeDetails.download_url + "\'\"></markdown>";
    //document.getElementById("readmeContent").innerHTML = html;
    //document.getElementsByName('readmeContent')[0].setAttribute('src',"'" + this.readmeDetails.download_url + "'");
    //document.getElementsByName('readmeContent').setAttribute('src',"\"'" + this.readmeDetails.download_url + "\"'");
    //document.getElementsByName('readmeContent')[0].getElementsByTagName("markdown")[0].setAttribute('[src]', "\"'" + this.readmeDetails.download_url + "\"'");
  }
}
