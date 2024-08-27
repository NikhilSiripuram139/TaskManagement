import { Taskstatus } from "../tasks.status.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(Taskstatus)
    status:Taskstatus;

    @IsOptional()
    @IsString()
    search:string;
}