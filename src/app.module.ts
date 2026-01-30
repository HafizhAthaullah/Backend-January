import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [PrismaModule, BooksModule, MembersModule, AuthModule, UsersModule, BcryptModule],
})
export class AppModule {}
