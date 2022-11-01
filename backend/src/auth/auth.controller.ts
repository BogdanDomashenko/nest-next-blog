import type { User } from '@prisma/client';
import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { Response, response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto): Promise<void> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(200)
  async signin(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SigninDto,
  ): Promise<void> {
    const { access_token } = await this.authService.signin(dto);

    response.cookie('access_token', access_token, {
      maxAge: 30 * 60 * 1000,
    });
    return;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie('access_token');
    return;
  }
}
