import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}
  async create(createUserDto: CreateUserDto) {
    const createUser = await this.prismaService.user.create({data:createUserDto})
    return createUser;
  }

  async findAll() {
    const findMany = await this.prismaService.user.findMany();
    return findMany;
  }

  async findOne(id: string) {
    const findOne = await this.prismaService.user.findUnique({where:{id:id}});
    return findOne; 
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prismaService.user.update({data:updateUserDto, where:{id:id}});
    return updateUser;
  }

  async remove(id: string) {
   const deleteUser = await this.prismaService.user.delete({where:{id:id}});
   return deleteUser;
  }
}
