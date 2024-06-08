import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '../../users/entities/auth.entity';

@Entity()
@ObjectType()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field()
  @Column()
  content: string;

  @Field(() => Auth)
  @ManyToOne(() => Auth, (user) => user.comments)
  user: Auth;
}
