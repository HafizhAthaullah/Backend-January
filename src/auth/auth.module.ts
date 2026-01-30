import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    BcryptService
  ],
})
export class AuthModule {}
