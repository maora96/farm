import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'phone must be a string.' })
  @IsNotEmpty()
  phone: string;
}
