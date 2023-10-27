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
   @ApiProperty({ example: 'Emiliano' })
   firstname: string

   @IsNotEmpty()
   @ApiProperty({ example: 'Santana' })
   lastname: string

   @IsNotEmpty()
   @ApiProperty({ example: 'Desarrollador' })
   position: string
}
