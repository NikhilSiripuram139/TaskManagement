import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [
    TaskService,
    TaskRepository
  ]
})
export class TasksModule {}
