import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
   @IsEmail()
   @IsNotEmpty()
   @ApiProperty({ example: 'admin@pruebas.com' })
   email: string

   @IsNotEmpty()
   @ApiProperty({ example: 'admin' })
   password: string

   @IsNotEmpty()
   @ApiProperty({ example: 'Brandon' })
   firstname: string

   @IsNotEmpty()
   @ApiProperty({ example: 'Fernández' })
   lastname: string

   @IsNotEmpty()
   @ApiProperty({ example: 'Developer' })
   position: string
}
