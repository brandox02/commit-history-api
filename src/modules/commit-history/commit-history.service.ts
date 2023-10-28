import { HttpException, Injectable } from '@nestjs/common';
import { FindCommitHistoryOutputDto } from './dto/find-commit-history-output.dto';
import { FindCommitHistoryDto } from './dto/find-commit-history.dto';
import { Commit } from './types';

@Injectable()
export class CommitHistoryService {
  async findAll({ repo, username }: FindCommitHistoryDto) {

    function formatResponse(commits: Commit[]): FindCommitHistoryOutputDto[] {
      return commits.map(({ commit: { comment_count, author, committer, message, }, html_url, node_id, author: { avatar_url } }) => ({
        author: author,
        comment_count,
        committer,
        message,
        url: html_url,
        id: node_id,
        avatar_url
      }))
    }

    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
    const commits = await response.json();
    if (commits?.message && commits.message.includes('API rate limit exceeded')) {
      throw new HttpException('Github Api rate limit exceeded', 500);
    }
    if (commits?.message === 'Not Found') {
      throw new HttpException('Not found', 404);
    }

    return formatResponse(commits as Commit[])

  }
}
