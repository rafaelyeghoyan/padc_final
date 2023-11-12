import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class TaskDto {
  @Min(5)
  @IsString()
  title: string;
  @Min(4)
  @IsString()
  content: string;
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'The date format is incorrect please correct it YYYY-MM-DD',
  })
  dueDate: string;
  @Min(1)
  @IsNumber()
  userId: number;
}
