import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { LogComponent } from './log/log.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
// import { UserdetailsComponent } from './dashboard/userdetails/userdetails.component';

export const routes: Routes = [
    // { path: '',  component : WelcomeComponent },
    { path: 'Home', component : WelcomeComponent },
    { path : 'Log', component : LogComponent },
    { path : 'Dashboard', component : DashboardComponent },
    { path : 'Createtask', component : CreateTaskComponent },
    { path : 'Edittask', component : EditTaskComponent },
    // { path : 'Details', component : UserdetailsComponent },
];
