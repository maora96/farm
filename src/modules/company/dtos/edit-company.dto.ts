import { IsOptional, IsString } from 'class-validator';

export class EditCompanyDTO {
  @IsString({ message: 'name must be a string.' })
  @IsOptional()
  name: string;

  @IsString({ message: 'document must be a string.' })
  @IsOptional()
  document: string;
}
