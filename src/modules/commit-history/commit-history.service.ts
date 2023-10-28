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

    // return formatResponse(commits as Commit[])
    return [{ "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-28T00:27:28Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-28T00:27:28Z" }, "message": "added the avatar_url and id fields", "url": "https://github.com/brandox02/commit-history-api/commit/024e324937f8aec65ff6fe58ca54d3911df18801", "id": "C_kwDOKl5WG9oAKDAyNGUzMjQ5MzdmOGFlYzY1ZmY2ZmU1OGNhNTRkMzkxMWRmMTg4MDE", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T18:26:41Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T18:26:41Z" }, "message": "cleaned up of the code", "url": "https://github.com/brandox02/commit-history-api/commit/3373309f927834e0050927b69d7faf7d4df461fa", "id": "C_kwDOKl5WG9oAKDMzNzMzMDlmOTI3ODM0ZTAwNTA5MjdiNjlkN2ZhZjdkNGRmNDYxZmE", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:59:18Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:59:18Z" }, "message": "get all commit history endpoint was protected", "url": "https://github.com/brandox02/commit-history-api/commit/ee069b6709d698ae1ca91e7882bb4faf2bc24539", "id": "C_kwDOKl5WG9oAKGVlMDY5YjY3MDlkNjk4YWUxY2E5MWU3ODgyYmI0ZmFmMmJjMjQ1Mzk", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:55:07Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:55:07Z" }, "message": "enhaced the api response type and format", "url": "https://github.com/brandox02/commit-history-api/commit/10050bbc50f4b3182c7a99bcad08f0edd21c890c", "id": "C_kwDOKl5WG9oAKDEwMDUwYmJjNTBmNGIzMTgyYzdhOTliY2FkMDhmMGVkZDIxYzg5MGM", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:31:25Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:31:25Z" }, "message": "unussed endpoint from commit-history were removed, github commit api response was typified", "url": "https://github.com/brandox02/commit-history-api/commit/0836665d14a5ab69054863bbb682d06ff65b5e41", "id": "C_kwDOKl5WG9oAKDA4MzY2NjVkMTRhNWFiNjkwNTQ4NjNiYmI2ODJkMDZmZjY1YjVlNDE", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:25:44Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T15:25:44Z" }, "message": "commit-history module has been created", "url": "https://github.com/brandox02/commit-history-api/commit/3631260f900fae87bf15e24cbddd11ca3f568189", "id": "C_kwDOKl5WG9oAKDM2MzEyNjBmOTAwZmFlODdiZjE1ZTI0Y2JkZGQxMWNhM2Y1NjgxODk", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T14:52:54Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T14:52:54Z" }, "message": "confirmation email title updated", "url": "https://github.com/brandox02/commit-history-api/commit/1c589d3c020aaa6b8d14838a9a63387e8764ba8c", "id": "C_kwDOKl5WG9oAKDFjNTg5ZDNjMDIwYWFhNmI4ZDE0ODM4YTlhNjMzODdlODc2NGJhOGM", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }, { "author": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T14:43:39Z" }, "comment_count": 0, "committer": { "name": "Brandon Fernandez", "email": "brandox02.dev@gmail.com", "date": "2023-10-27T14:43:39Z" }, "message": "first commit", "url": "https://github.com/brandox02/commit-history-api/commit/5d54ee9b6b2107a76ad3c96b648990b561cb0aa8", "id": "C_kwDOKl5WG9oAKDVkNTRlZTliNmIyMTA3YTc2YWQzYzk2YjY0ODk5MGI1NjFjYjBhYTg", "avatar_url": "https://avatars.githubusercontent.com/u/67993552?v=4" }]
  }
}
