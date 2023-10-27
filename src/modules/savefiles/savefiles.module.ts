import { Module } from '@nestjs/common';
import { SaveFileProvider } from './savefile.provider';
import { SavefilesService } from './savefiles.service';
import { FileSizeValidationPipe } from './saveImg.pipe';

@Module({
  providers: [SavefilesService, SaveFileProvider, FileSizeValidationPipe],
  exports: [SaveFileProvider, SavefilesService, FileSizeValidationPipe],
})
export class SavefilesModule {}
