import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TasksService } from '../Services/tasks.service';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {


  data:any;
  
  authservice = inject(AuthService);
  apiservice = inject(TasksService);
  
  ngOnInit(): void {
    this.authservice.autologin();
  }

  // get(){
  //   this.apiservice.getHello();
  // }
  




  username='nikhilsiripuram139';
  password='Nikhil139';
  // onSignIn(){
  //   return this.apiservice.signIn(this.username,this.password).subscribe((res)=>{
  //     console.log("Triggered");
  //     console.log("Raw Response:", res)
  //     let data:any = res;
  //     console.log(data.accessToken)
  //   });
  // }

}
