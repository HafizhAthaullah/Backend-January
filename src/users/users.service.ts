import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    readonly prisma: PrismaService,
    readonly bcrypt: BcryptService,
  ) {}
  
    async create(dto: CreateUserDto) {
      const hashedPassword = await this.bcrypt.hashpassword(dto.password);
      try {
              return await this.prisma.user.create({
        data: { ...dto, password: hashedPassword },
      });
      } catch (error) {
        console.log(error); 
      }

    }
  
    async findAll() {
      return this.prisma.user.findMany({
        orderBy: { id: 'asc' },
      });
    }
  
    async findOne(id: number) {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        throw new NotFoundException('Member not found');
      }
  
      return user;
    }
  
    async update(id: number, dto: UpdateUserDto) {
      await this.findOne(id);
  
      return this.prisma.user.update({
        where: { id },
        data: dto,
      });
    }
  
    async remove(id: number) {
      await this.findOne(id);
  
      await this.prisma.user.delete({
        where: { id },
      });
  
      return {
        message: `Member with id ${id} deleted`,
      };
    }
}
