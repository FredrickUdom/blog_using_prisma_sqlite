import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';



@Module({
  imports: [PrismaModule, UsersModule, CategoryModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
