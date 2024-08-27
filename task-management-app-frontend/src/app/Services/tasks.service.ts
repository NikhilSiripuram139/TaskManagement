import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../Models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  tasks=new Subject<Task[]>();
  edit=new Subject<boolean>();
  userid=new Subject<string>();
  selectedTask= new  BehaviorSubject<Task>(null);

  onAddTask(data: {title:string, description:string}): Observable<Task | object> {
    // return this.http.post('https://localhost:3000/tasks', data);
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.post('http://localhost:3000/tasks', data);
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getAllTasks(): Observable<Task[] | object> {
    // return this.http.get('https://localhost:3000/tasks');
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.get('http://localhost:3000/tasks');
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getTaskbyId(id: string): Observable<Task[] | object> {
    // return this.http.get('https://localhost:3000/tasks/' + id);
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.get('http://localhost:3000/tasks/' + id);
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  deleteTask(id: string) {
    // return this.http.delete('https://localhost:3000/tasks/' + id);
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.delete('http://localhost:3000/tasks/' + id);
      console.log('in delete!');
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  deleteallTasks() {
    // return this.http.delete('https://localhost:3000/tasks');
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.delete('http://localhost:3000/tasks');
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  updateTask(id: string, data: Task) {
    // return this.http.patch('https://localhost:3000/tasks/' + id, data);
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.patch('http://localhost:3000/tasks/'+ id, data);
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getTaskbyStatus(status: string): Observable<Task | object> {
    // return this.http.get('https://localhost:3000/tasks?' + status);
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.get('http://localhost:3000/tasks?' + status);
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getTaskbySearch(search: string): Observable<Task | object> {
    // return this.http.get('https://localhost:3000/tasks?' + search);
    try {
      let taskobs:Observable<any>;
      taskobs=this.http.get('http://localhost:3000/tasks?' + search);
      return taskobs; 
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}
