import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExampleService } from './example/example.service';
import { ExampleController } from './example/example.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      isGlobal : true,
      max : 100,
      ttl : 60 * 1000,
      store : redisStore,
      host : '172.17.0.3',
      port : 6379,
    }),
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Task-Management',
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
  providers: [ ExampleService],
  controllers: [ExampleController],
})
export class AppModule {}
