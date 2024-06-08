import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Post } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { Auth } from './users/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Collinsceleb21&',
      database: 'instagram_clone',
      synchronize: true,
      logging: false,
      entities: [Post, Comment, Auth],
      migrations: [],
      subscribers: [],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      csrfPrevention: false,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PostsModule,
    CommentsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
