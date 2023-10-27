import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @ApiProperty({ example: "position 1" })
  position: string;

  @ApiProperty({ example: "OGTIC" })
  institution: string;// i aint got the time
}
