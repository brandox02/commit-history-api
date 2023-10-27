import { Injectable } from '@nestjs/common';
import { CreateCommitHistoryDto } from './dto/create-commit-history.dto';
import { UpdateCommitHistoryDto } from './dto/update-commit-history.dto';
import { Commit } from './types';

@Injectable()
export class CommitHistoryService {
  async findAll(username: string, repoName: string): Promise<Commit[]> {

    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
    const commits = await response.json();
    return commits;
  }

}
