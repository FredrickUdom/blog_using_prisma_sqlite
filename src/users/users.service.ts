import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService){}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const {firstName, lastName, email, password} = createUserDto;
      const hashPassword = await bcrypt.hash(password, 10);
      const createUser = await this.prismaService.user.create({data:{firstName, lastName, email, password:hashPassword}});
      return createUser;
      
    } catch (error) {
      if(error.code === "P2002"){
        throw new HttpException('sorry user with same email already exist', 400)
      }
      return error;
    }
   
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
