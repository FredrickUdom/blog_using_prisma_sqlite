import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService:PrismaService){}
  async create(createPostDto: CreatePostDto) {
    const createPost = await this.prismaService.post.create({data: createPostDto});
    return createPost;
  }

  async findAll() {
    const findAllPost = await this.prismaService.post.findMany();
    return findAllPost;
  }

  async findOne(id: string) {
    const findOne = await this.prismaService.post.findUnique({where:{id:id}});
    return findOne;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updateOne = await this.prismaService.post.update({data:updatePostDto, where:{id:id}})
    return updateOne;
  }

  async remove(id: string) {
    const deleteOne = await this.prismaService.post.delete({where:{id:id}});
    return deleteOne;
  }
}
