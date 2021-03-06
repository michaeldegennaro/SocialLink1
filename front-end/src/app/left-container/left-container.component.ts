import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.css']
})
export class LeftContainerComponent implements OnInit, OnDestroy {

  user: User;
  private trashSub = Subscription.EMPTY;

  AWS_S3_PATH = "https://rev-p2-socialmedia-2102.s3.us-east-2.amazonaws.com/"; 

  constructor(private userService: UserServicesService) { }

  ngOnInit(): void {
    this.profileUserView();
  }

  currentUser() {
    this.userService.getUserSession().subscribe(
      data=> {
        this.user = data;
      }
    )
  } 


  profileUserView() {
    
      this.trashSub = this.userService.currentUserProfileView.subscribe(
        data => {
          this.user = data;
          console.log("in the profileUserView method in left conatiner componenet")
          // console.log(this.user)
        });


    }
    
    ngOnDestroy(){
      this.trashSub.unsubscribe();
    }

}
