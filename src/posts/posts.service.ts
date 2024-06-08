import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Auth } from '../users/entities/auth.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Auth) private readonly userRepository: Repository<Auth>,
  ) {}
  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { id: createPostInput.userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const newPost = this.postRepository.create({ ...createPostInput, user });
    await this.postRepository.save(newPost);
    return newPost;
  }

  async getAllPost(): Promise<Post[]> {
    const allPost = await this.postRepository.find({
      relations: ['user', 'comments'],
    });
    return allPost;
  }

  async getPostById(id: number): Promise<Post> {
    const getOnePost = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });
    if (!getOnePost) {
      throw new NotFoundException(`Post with the ${id} is not found`);
    }
    return getOnePost;
  }

  async updatePostById(
    id: number,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    await this.postRepository.update(id, updatePostInput);
    const post = await this.getPostById(id);
    return post;
  }

  async deletePost(id: number) {
    const result = await this.postRepository.delete(id);
    return { success: result.affected > 0 };
  }
}
