import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  postId: number;

  @Field()
  content: string;

  @Field(() => Int)
  userId: number;
}
