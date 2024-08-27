import { AfterContentInit, AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Task, Taskstatus } from '../Models/Task';
import { TasksService } from '../Services/tasks.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit, OnDestroy {

  constructor(private taskservice: TasksService) {

  }

  @ViewChild('registrationform') form: NgForm;

  router = inject(Router);
  selectedTask: Task;
  userid: string;
  task: Task;

  useridsub: Subscription;
  selectedTasksub: Subscription;

  Title = '';
  Description = '';
  Status = '';


  ngOnInit(): void {
    this.selectedTasksub = this.taskservice.selectedTask.subscribe((res) => {
      console.log("In on in it!")
      // console.log(res)
      this.selectedTask = res;
      this.Title = this.selectedTask.title;
      this.Status = this.selectedTask.status;
      this.Description = this.selectedTask.description;
    });
  };

  

  ngOnDestroy(): void {
    this.selectedTasksub.unsubscribe();
  }


  onformsubmit() {
    // console.log(this.form);
    this.Title = this.form.value.title;
    this.Description = this.form.value.description;
    this.Status = this.form.value.status;


    const data = {
      title: this.form.value.title,
      status: this.form.value.status,
      description: this.form.value.description,
    }

    this.onEditTask(this.selectedTask.id, data);

    this.form.reset();

    this.router.navigate(['/Dashboard']);
  }

  onEditTask(id: string, data: { title: string, status: Taskstatus, description: string }) {
    this.taskservice.updateTask(id, data).subscribe(
      {
        next: (res) => {
          let data: any = res;
          this.taskservice.tasks.next(data);
        }, error: (err) => {
          console.log(err);
        }
      });
  }

}
