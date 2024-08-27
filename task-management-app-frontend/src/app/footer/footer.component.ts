import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TasksService } from '../Services/tasks.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  dashboard:boolean;
  tasksservice = inject(TasksService);

  ngOnInit(): void {
      // this.tasksservice.dashboard.subscribe((data)=>{
      //   this.dashboard=data;
      // })
  }

}
