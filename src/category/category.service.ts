import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService:PrismaService){}
  async create(createCategoryDto: CreateCategoryDto) {
    const createCategory = await this.prismaService.category.create({data:createCategoryDto});
    return createCategory;
  }

  async findAll() {
    const findAllCategory = await this.prismaService.category.findMany();
    return findAllCategory;
  }

  async findOne(id: string) {
    const findOneCategory = await this.prismaService.category.findUnique({where:{id:id}});
    return findOneCategory;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.prismaService.category.update({data:updateCategoryDto, where:{id:id}});
    return updateCategory;
  }

  async remove(id: string) {
    
    const deleteCategory = await this.prismaService.category.delete({where:{id:id}})
    if(!deleteCategory){
      throw new NotFoundException('category not found to delete');
    }
    return deleteCategory;
  }
}
