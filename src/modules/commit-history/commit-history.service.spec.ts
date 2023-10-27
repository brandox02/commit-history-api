import { Test, TestingModule } from '@nestjs/testing';
import { CommitHistoryService } from './commit-history.service';

describe('CommitHistoryService', () => {
  let service: CommitHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommitHistoryService],
    }).compile();

    service = module.get<CommitHistoryService>(CommitHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
