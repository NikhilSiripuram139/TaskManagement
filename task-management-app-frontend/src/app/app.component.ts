import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from './Models/User';
import { TasksService } from './Services/tasks.service';
import { AuthService } from './Services/auth.service';
import { HeaderComponent } from './header/header.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LogComponent } from './log/log.component';
import { FormsModule } from '@angular/forms';
// import { CreateTaskComponent } from './create-task/create-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    HeaderComponent, 
    FooterComponent,HttpClientModule, LogComponent,
    FormsModule, RouterModule, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taskmanagementapp-frontend';


  tasksservice = inject(TasksService);
  authservice=inject(AuthService);
  

  ngOnInit(): void {
    this.authservice.autologin();
  }

  selecteduserdata(user: User) {
    // this.selecteduser = user;
    // console.log(this.selecteduser);
  }

}
