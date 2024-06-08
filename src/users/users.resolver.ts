import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Auth)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.register(createUserInput);
  }

  @Mutation(() => Auth)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.login(loginUserInput);
  }
}
