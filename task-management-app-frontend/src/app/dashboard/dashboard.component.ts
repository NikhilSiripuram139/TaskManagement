import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from "../utility/snackbar/snackbar.component";
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../utility/loader/loader.component";
import { Router, RouterModule } from '@angular/router';
import { Task } from '../Models/Task';
import { User } from '../Models/User';
import { TasksService } from '../Services/tasks.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SnackbarComponent, CommonModule, LoaderComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  taskslist: Task[] = [];
  selectedTask: Task;
  isloading:boolean;
  errormessage:string|null;

  userdetails: User | null = null;

  errorsub : Subscription;
  tasksservice = inject(TasksService);
  authservice=inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.fetchTasksClicked();
  }


  onCreateTask() {
    this.router.navigate(['/Createtask']);
  }

  fetchTasksClicked(){
    this.tasksservice.getAllTasks().subscribe({
      next:(res)=>{
        let data:any=res;
        this.taskslist=data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  

  // ondeleteallTasks() {
  //   this.tasksservice.deleteallTasks();
  //   setTimeout(() => {
  //     this.fetchdataclicked();
  //   }, 1000);
  // }

  onDeleteTask(id: string | undefined) {
    console.log(id);
    this.tasksservice.deleteTask(id).subscribe();
    setTimeout(() => {
      this.fetchTasksClicked();
    }, 1000);
  }

  onEditTask(id: string | undefined) {
    this.tasksservice.userid.next(id);
 
    this.selectedTask = this.taskslist.find((user) => user.id === id);
    console.log(this.selectedTask);
    this.tasksservice.selectedTask.next(this.selectedTask);
    this.router.navigate(['/Edittask']);
  }


}
