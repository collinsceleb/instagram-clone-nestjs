/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    const { username } = payload;
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
