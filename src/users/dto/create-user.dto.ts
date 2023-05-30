import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({})
    @IsString()
    firstName: string;

    @IsNotEmpty({})
    @IsString()
    lastName: string;

    @IsNotEmpty({})
    @IsEmail()
    email: string;

    @IsNotEmpty({})
    @MinLength(8)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}
