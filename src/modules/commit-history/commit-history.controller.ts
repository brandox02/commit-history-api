import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommitHistoryService } from './commit-history.service';
import { FindCommitHistoryDto } from './dto/find-commit-history.dto';

@Controller('commit-history')
@ApiTags('Commit History')
@UseInterceptors(ClassSerializerInterceptor)
export class CommitHistoryController {
  constructor(private readonly commitHistoryService: CommitHistoryService) { }


  @Get()
  findAll(@Query() { repo, username }: FindCommitHistoryDto) {
    return this.commitHistoryService.findAll(username, repo);
  }

}
