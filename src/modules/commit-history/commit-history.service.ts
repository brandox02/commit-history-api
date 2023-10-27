import { HttpException, Injectable } from '@nestjs/common';
import { FindCommitHistoryOutputDto } from './dto/find-commit-history-output.dto';
import { Commit } from './types';

@Injectable()
export class CommitHistoryService {
  async findAll(username: string, repoName: string): Promise<FindCommitHistoryOutputDto[]> {

    function formatResponse(commits: Commit[]): FindCommitHistoryOutputDto[] {
      return commits.map(({ commit: { comment_count, author, committer, message, url } }) => ({
        author: author,
        comment_count,
        committer,
        message,
        url
      }))
    }

    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
    const commits = await response.json();

    if (commits?.message === 'Not Found') {
      throw new HttpException('Not found', 404);
    }
    return formatResponse(commits as Commit[]);

  }


}
