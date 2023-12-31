
import { CommitAuthorClass } from "../types";

export class FindCommitHistoryOutputDto {
   author: CommitAuthorClass;
   committer: CommitAuthorClass;
   message: string;
   url: string;
   comment_count: number
   id: string
   avatar_url: string
}