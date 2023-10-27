import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: "admin@pruebas.com" })
  email: string;

  @ApiProperty({ example: "position 2" })
  position: string;

  @ApiProperty({ example: "OGTIC" })
  institution: string;

  @IsNotEmpty()
  @ApiProperty({ example: "admin" })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: "admin" })
  passwordConfirmation: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Emiliano" })
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Santana" })
  lastname: string;


}
