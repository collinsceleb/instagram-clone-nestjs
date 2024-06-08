import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  postId: number;

  @Field()
  content: string;

  @Field()
  userId: number;
}
