import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserImgDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'admin@pruebas.com' })
  img: Express.Multer.File;
}
