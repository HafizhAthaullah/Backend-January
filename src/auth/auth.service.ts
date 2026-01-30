import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: { member: true },
    });

    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const passwordValid = await this.bcrypt.comparePassword(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      memberId: user.memberId,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }
}
