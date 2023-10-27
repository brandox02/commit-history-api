import { PartialType } from '@nestjs/swagger';
import { CreateCommitHistoryDto } from './create-commit-history.dto';

export class UpdateCommitHistoryDto extends PartialType(CreateCommitHistoryDto) {}
