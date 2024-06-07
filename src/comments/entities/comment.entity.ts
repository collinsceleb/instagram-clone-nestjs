import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field()
  @Column()
  content: string;

  @Field()
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
