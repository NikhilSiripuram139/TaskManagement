import { IsNotEmpty } from "class-validator";
import { Taskstatus } from "../tasks.status.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    status:Taskstatus;
}