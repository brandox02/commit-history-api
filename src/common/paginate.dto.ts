import { ApiProperty } from "@nestjs/swagger";
import { PaginateQuery } from "./paginate";
import { IsOptional } from "class-validator";

export enum SORT_OPTIONS {
  DESC="DESC",
  ASC= "ASC",
}

export class paginateDto implements PaginateQuery {
  @ApiProperty({ example: 20 })
  @IsOptional()
  take: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  page: number;

  @ApiProperty({ example: SORT_OPTIONS.DESC, enum: SORT_OPTIONS })
  @IsOptional()
  sort: SORT_OPTIONS;
}
