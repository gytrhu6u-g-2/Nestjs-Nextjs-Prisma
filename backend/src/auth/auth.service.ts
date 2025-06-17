import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // prismaからユーザ情報を取得する
  async getUser(
    email: string,
    password: string,
  ): Promise<Pick<Users, 'id' | 'email'> | null> {
    const user = await this.prismaService.users.findFirst({
      select: {
        id: true,
        email: true,
      },
      where: {
        email,
        password,
      },
    });

    return user;
  }
}
