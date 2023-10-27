import { ApiProperty } from "@nestjs/swagger";

export class FindCommitHistoryDto {
   @ApiProperty()
   username: string;
   @ApiProperty()
   repo: string;
}