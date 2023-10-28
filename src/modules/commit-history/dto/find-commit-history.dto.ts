import { ApiProperty } from "@nestjs/swagger";
import { paginateDto } from "src/common/paginate.dto";

export class FindCommitHistoryDto {
   @ApiProperty()
   username: string;
   @ApiProperty()
   repo: string;
}