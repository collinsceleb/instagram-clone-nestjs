import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateCommentInput } from './create-comment.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}
