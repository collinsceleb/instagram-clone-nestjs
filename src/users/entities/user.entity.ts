import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Comment], { nullable: true })
  @ManyToOne(() => User, (user) => user.comments)
  comments: Comment[];
}
