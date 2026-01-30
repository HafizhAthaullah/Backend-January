import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    username: string;
      
    @IsString()
    @IsOptional()
    password: string;
    
    @IsEnum($Enums.UserRole)
    @IsOptional()
    role: $Enums.UserRole;
}
