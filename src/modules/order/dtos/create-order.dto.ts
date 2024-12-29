import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'phone must be a string.' })
  @IsNotEmpty()
  phone: string;
}
