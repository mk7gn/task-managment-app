import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const {title, description} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks;
  }

  changeTaskStatus(id: string, payload: {status: TaskStatus}): Task[] {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.status = payload.status;
      }
      return task;
    });
    return this.tasks;
  }
}
