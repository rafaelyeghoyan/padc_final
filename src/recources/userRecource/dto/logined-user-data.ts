import { TaskDto } from '../../taskResource/dto/create-task.dto';

export class UserData {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  role: string;
  email: string;
  id: number;
  accessToken: string;
  userTasks: TaskDto[];
}
