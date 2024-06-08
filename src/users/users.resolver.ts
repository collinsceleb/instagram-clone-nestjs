import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.register(createUserInput);
  }

  @Mutation(() => User)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<{ accessToken: string; user: User }> {
    return this.usersService.login(loginUserInput);
  }
}
