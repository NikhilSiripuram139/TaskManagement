import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './Models/Task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // constructor(private http: HttpClient) { }

  // authtoken: string;
  // async getHello() {
  //   console.log("jjjj");
  //   try {
  //     this.http.get('http://localhost:3000',).subscribe((res) => {
  //       console.log("Triggered");
  //       console.log("Raw Response:", res);
  //       let data:any=res;
  //       console.log("Message:", data.message);
  //       return res
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  

  //  signIn(username:string, password:string):Observable<string>{
  //   console.log("In signin!")
  //   const data = {username,password};
  //   try{
  //     return this.http.post<string>('http://localhost:3000/auth/signin',data);
  //   }catch(error){
  //     console.log(error);
  //     return error;
  //   }
  // }

  // // getAllTasks(): Observable<Task[]>{
  // //   return this.http.get<Task[]>('http://localhost:3000/tasks');
  // // }
}
