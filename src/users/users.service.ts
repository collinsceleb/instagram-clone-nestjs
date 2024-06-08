import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(createUserInput);
    await user.hashPassword();
    return user;
  }

  async validateUser(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.findOneBy({
      username: createUserInput.username,
    });
    if (user && user.validatePassword(createUserInput.password)) {
      return user;
    }
    return null;
  }

  async login(
    loginUserInput: LoginUserInput,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.validateUser(loginUserInput);
    if (!user) {
      throw new NotFoundException('Invalid login credentials');
    }
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, user };
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username });
  }
}
