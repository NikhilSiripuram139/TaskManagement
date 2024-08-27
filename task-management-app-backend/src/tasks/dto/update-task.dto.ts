import { IsEnum, IsString } from "class-validator";
import { Taskstatus } from "../tasks.status.enum";

export class UpdateTaskDto {
    @IsString()
    title : string;

    @IsEnum(Taskstatus)
    status : Taskstatus;

    @IsString()
    description : string;
}