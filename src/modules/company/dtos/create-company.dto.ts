import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/user/user.entity';

export class CreateCompanyDTO {
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'document must be a string.' })
  @IsNotEmpty()
  document: string;

  @IsArray()
  @IsNotEmpty({ message: "Users can't be empty" })
  users: User[];
}
