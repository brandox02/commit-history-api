import { Module } from '@nestjs/common';
import { CommitHistoryService } from './commit-history.service';
import { CommitHistoryController } from './commit-history.controller';

@Module({
  controllers: [CommitHistoryController],
  providers: [CommitHistoryService]
})
export class CommitHistoryModule {}
