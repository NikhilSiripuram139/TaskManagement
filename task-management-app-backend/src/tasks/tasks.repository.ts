import { DataSource, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Taskstatus } from "./tasks.status.enum";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(gettasksdto : GetTaskFilterDto, user : User): Promise<Task[]>{
        const { status, search } = gettasksdto;

        const query = this.createQueryBuilder('task');

        query.where({user});

        if(status){
            query.andWhere( 'task.status= :status', {status}); 
        }

        if(search){
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                {search : `%${search}%`},
            )
        }

        const tasks = await query.getMany();
        return tasks;
    }


    async createTask(createtaskdto : CreateTaskDto, user : User): Promise<Task> {
        const { title, description, status } = createtaskdto;

        const task = this.create({
            title,
            description,
            status,
            user
        })

        await this.save(task);
        return task;
    }
}
