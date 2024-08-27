import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { LogComponent } from "../log/log.component";
import { CommonModule } from '@angular/common';
// import { UserCredentials } from '../Models/userCredentials';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';
import { TasksService } from '../Services/tasks.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogComponent, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  ondashboard: boolean = false;
  isloged: boolean;
  // user:UserCredentials;

  authservice = inject(AuthService);
  tasksservice = inject(TasksService);
  private usersub: Subscription;


  ngOnInit(): void {

    this.authservice.accessToken.subscribe((data) => {
      this.isloged = data? true:false;
      // console.log(this.isloged)
    })

  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }

  logout() {
    this.authservice.logout();
  }

}
