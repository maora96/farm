import { IsOptional, IsString } from 'class-validator';

export class EditOrderDTO {
  @IsString({ message: 'name must be a string.' })
  @IsOptional()
  name: string;

  @IsString({ message: 'phone must be a string.' })
  @IsOptional()
  phone: string;
}
