import { IsNotEmpty } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class ChangePassCodeDto {
    @IsNotEmpty()
    @ApiProperty()
    code: string

    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @ApiProperty()
    confirmpassword: string
}
