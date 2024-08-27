import { Task } from "./Task";

export class User {
    id:string;
    username:string;
    password:string;
    tasks?:Task[];
}