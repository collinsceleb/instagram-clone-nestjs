import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Auth) private readonly userRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // async hashPassword(password) {
  //   const hashPassword = await argon2.hash(password);
  // }

  // async validatePassword(password: string): Promise<boolean> {
  //   return await argon2.verify(this.password, password);
  // }
  async register(createUserInput: CreateUserInput): Promise<Auth> {
    try {
      const user = this.userRepository.create(createUserInput);
      const hashPassword = await argon2.hash(createUserInput.password);
      user.password = hashPassword;
      user.username = createUserInput.username;
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async signToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
    return token;
  }

  async validateUser(createUserInput: CreateUserInput): Promise<Auth> {
    const user = await this.userRepository.findOneBy({
      username: createUserInput.username,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validatePassword = await argon2.verify(
      user.password,
      createUserInput.password,
    );
    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }
    if (!user || !user.id) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async login(loginUserInput: LoginUserInput): Promise<Auth> {
    const user = await this.validateUser(loginUserInput);
    console.log(user);
    if (!user) {
      throw new NotFoundException('Invalid login credentials');
    }
    const userToken = await this.signToken(user.id, user.username);
    user.token = userToken;
    console.log(userToken);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findOneByUsername(username: string): Promise<Auth> {
    return this.userRepository.findOneBy({ username: username });
  }
}
