import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../../comments/entities/comment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auth } from '../../users/entities/auth.entity';

@Entity()
@ObjectType()
export class Post {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ default: true })
  isPublished: boolean;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => Auth)
  @ManyToOne(() => Auth, (user) => user.posts)
  user: Auth;
}
