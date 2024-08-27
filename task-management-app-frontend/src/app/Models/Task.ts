import { User } from "./User";

export class Task {
    title:string;
    description:string;
    status?:Taskstatus;
    user?:User;
    id?:string;
}

export enum Taskstatus {
    OPEN='OPEN',
    IN_PROGRESS='IN_PROGRESS',
    DONE='DONE'
}