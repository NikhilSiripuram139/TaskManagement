import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../Models/User';
import { Task, Taskstatus } from '../Models/Task';
import { TasksService } from '../Services/tasks.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  constructor(private taskservice: TasksService) {

  }

  ngOnInit(): void {
    this.taskservice.userid.subscribe({
      next: (res) => {
        let data: any = res;
        this.userid = data;
      }
    });

  };

  @ViewChild('registrationform') form: NgForm;

  router = inject(Router);

  userid: string;
  task: Task;
  content: string = '';

  Title = '';
  Description = '';
  Status = '';

  onformsubmit() {

    // console.log(this.form);
    this.Title = this.form.value.title;
    this.Description = this.form.value.description;
    this.Status = this.form.value.status;


    const data = {
      title: this.form.value.title,
      description: this.form.value.description,
      status: this.form.value.status,
    }

    this.onAddTask(data);

    console.log('Created')

    this.form.reset();

    this.router.navigate(['/Dashboard']);
  }


  onAddTask(data: { title: string, description: string, status: Taskstatus }) {
    this.taskservice.onAddTask(data).subscribe(
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
