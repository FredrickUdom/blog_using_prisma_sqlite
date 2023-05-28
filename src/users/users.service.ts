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
      delete createUser.password;
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
    delete findOne.password;
    return findOne; 
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.prismaService.user.update({data:updateUserDto, where:{id:id}});
      delete updateUser.password;
      return {
        message: `user successfully updated,`,
        statusCode: 200,
        userDetails: updateUser
      };
    } catch (error) {
      if(error.code === "P2025"){
        return {
          message: 'sorry no such user found to update',
          statusCode: 400
         };
      }
    }
   
  }

  async remove(id: string) {
    try {
      const deleteUser = await this.prismaService.user.delete({where:{id:id}});
      if(deleteUser){
       return{
         message: `user: ${deleteUser.firstName}, successfully deleted`,
         statusCode: 200
       }
      }

    } catch (error) {
      if(error.code === "P2025"){
        return {
          message: 'sorry no such user found to delete',
          statusCode: 400
         };
      }
    }

  }
}
