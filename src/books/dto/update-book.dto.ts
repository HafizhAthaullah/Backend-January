import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateBookDto {
 @IsString()
 @IsOptional()
 title?: string;

 @IsString()
 @IsOptional()
 uthor?: string;

 @IsInt()
 @Min(1)
 @IsOptional()
 year?: number;
}
