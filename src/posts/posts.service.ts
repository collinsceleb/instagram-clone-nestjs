import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const newPost = this.postRepository.create(createPostInput);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async getAllPost(): Promise<Post[]> {
    const allPost = await this.postRepository.find();
    return allPost;
  }

  async getPostById(id: FindOneOptions<Post>): Promise<Post> {
    const getOnePost = await this.postRepository.findOne(id);
    if (!getOnePost) {
      throw new NotFoundException(`Post with the ${id} is not found`);
    }
    return getOnePost;
  }

  async updatePostById(
    id: any,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    await this.postRepository.update(id, updatePostInput);
    const post = await this.getPostById(id);
    return post;
  }

  deletePost(id: number) {
    return `This action removes a #${id} post`;
  }
}
