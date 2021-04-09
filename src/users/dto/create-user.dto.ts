import { IsEmail, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string;

    @MinLength(2)
    firstname: string;

    @MinLength(2)
    lastname: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}