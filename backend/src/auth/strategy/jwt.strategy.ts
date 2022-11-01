import type { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      'token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      console.log(req.cookies);
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: {
    sub: number;
    email: string;
    username: string;
  }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;
    return user;
  }
}
