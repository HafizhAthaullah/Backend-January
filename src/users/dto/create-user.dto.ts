import { $Enums } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum($Enums.UserRole)
  @IsNotEmpty()
  role: $Enums.UserRole;
}