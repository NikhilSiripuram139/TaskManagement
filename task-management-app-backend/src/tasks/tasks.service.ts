import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly taskRepository: TaskRepository
    ) { }

    async getTask(gettasksdto: GetTaskFilterDto, user: User): Promise<Task[] | any> {
        const cachedData: string = await this.cacheManager.get('Task');
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const result = await this.taskRepository.getTasks(gettasksdto, user);
        await this.cacheManager.set('Task', JSON.stringify(result));
        return result;
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, user } });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" is not found!`);
            console.log('not found')
        }
        return found;
    }

    createTask(createtaskdto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createtaskdto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, user });

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" is not found!`);
        }
    }

    async updateTask(id: string, updatetaskdto: UpdateTaskDto, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);

        task.title = updatetaskdto.title
        task.status = updatetaskdto.status;
        task.description = updatetaskdto.description;

        await this.taskRepository.save(task);

        return task;
    }

}
