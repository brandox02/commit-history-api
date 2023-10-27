import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: "admin@pruebas.com" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: "admin" })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: "admin" })
  passwordConfirmation: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Brandon" })
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Fernández" })
  lastname: string;


}
