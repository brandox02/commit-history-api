import { IsEmail, IsNotEmpty } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example:'admin@pruebas.com'})
    email:string

    @IsNotEmpty()
    @ApiProperty({example:'admin'})
    password:string
}
