import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommitHistoryService } from './commit-history.service';
import { CreateCommitHistoryDto } from './dto/create-commit-history.dto';
import { UpdateCommitHistoryDto } from './dto/update-commit-history.dto';

@Controller('commit-history')
export class CommitHistoryController {
  constructor(private readonly commitHistoryService: CommitHistoryService) { }


  @Get()
  findAll() {
    return this.commitHistoryService.findAll('', '');
  }


}
