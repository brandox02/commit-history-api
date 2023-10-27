import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommitHistoryService } from './commit-history.service';
import { CreateCommitHistoryDto } from './dto/create-commit-history.dto';
import { UpdateCommitHistoryDto } from './dto/update-commit-history.dto';

@Controller('commit-history')
export class CommitHistoryController {
  constructor(private readonly commitHistoryService: CommitHistoryService) {}

  @Post()
  create(@Body() createCommitHistoryDto: CreateCommitHistoryDto) {
    return this.commitHistoryService.create(createCommitHistoryDto);
  }

  @Get()
  findAll() {
    return this.commitHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commitHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommitHistoryDto: UpdateCommitHistoryDto) {
    return this.commitHistoryService.update(+id, updateCommitHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commitHistoryService.remove(+id);
  }
}
