import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    body: string;

    // adding the user id here to connect it in the relationship table in prisma
    userId: string;
}
