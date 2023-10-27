import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommitHistoryService } from './commit-history.service';
import { FindCommitHistoryDto } from './dto/find-commit-history.dto';

@Controller('commit-history')
@ApiTags('Commit History')
@UseInterceptors(ClassSerializerInterceptor)
export class CommitHistoryController {
  constructor(private readonly commitHistoryService: CommitHistoryService) { }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() { repo, username }: FindCommitHistoryDto) {
    return this.commitHistoryService.findAll(username, repo);
  }

}
