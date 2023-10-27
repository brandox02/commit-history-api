import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.size >= Number(process.env.MAX_IMG_SIZE)) {
      throw new BadRequestException('Max image size exeded');
    }

    if (
      !process.env.ACCEPT_IMG_TYPES.split(',').some(
        (o) => value.mimetype.split('/')[1] === o,
      )
    ) {
      throw new BadRequestException('incorret img type');
    }

    return value;
  }
}
