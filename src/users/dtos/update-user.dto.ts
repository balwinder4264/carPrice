import {IsString,IsEmail,IsOptional, isEmail, isString} from "class-validator";

//DATA TRANSFER OBJECT
export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email:string;
    
    @IsString()
    @IsOptional()
    password:string;
}

//INTERCEPTORS ARE MIDLLWARE