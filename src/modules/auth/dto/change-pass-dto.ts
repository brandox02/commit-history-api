import { IsNotEmpty } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class ChangePassDto {
    @IsNotEmpty()
    @ApiProperty()
    oldpassword: string

    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @ApiProperty()
    confirmpassword: string

    email: string
}
