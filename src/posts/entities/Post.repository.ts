/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity'; // Assuming you have a Post entity

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(@InjectRepository(Post) postRepository: Repository<Post>) {
    super(
      postRepository.target,
      postRepository.manager,
      postRepository.queryRunner,
    );
  }

  // Define custom methods specific to post data access here (optional)
}
