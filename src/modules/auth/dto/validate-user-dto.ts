import {  IsEmail, IsNotEmpty } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class ValidateUserDTO {
    @IsNotEmpty()
    @ApiProperty()
    code:string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string
}
