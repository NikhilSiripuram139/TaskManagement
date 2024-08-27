import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Taskstatus } from './tasks.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService : TaskService){}

    @Get()
    getTasks(@Query() gettasksdto : GetTaskFilterDto, @GetUser() user:User):Promise<Task[]> {
        return this.tasksService.getTask(gettasksdto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user:User): Promise<Task>{
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask( @Body() createtaskdto : CreateTaskDto, @GetUser() user:User): Promise<Task>{
        return this.tasksService.createTask(createtaskdto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string, @GetUser() user:User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id')
    updateTask(@Param('id') id:string, @Body() updatetaskdto : UpdateTaskDto, @GetUser() user:User):Promise<Task>{
        return this.tasksService.updateTask(id, updatetaskdto, user);
    }

}
