import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    console.log('auth.gethello');
    return this.authService.getHello();
  }

  @Post()
  async auth(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.authService.getUser(email, password);

    if (!user) {
      throw new BadRequestException('Error', {
        cause: new Error(),
        description: 'Can not find user',
      });
    }
    // 認証処理
    return { user: { user } };
  }
}
