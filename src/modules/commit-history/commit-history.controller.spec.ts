import { Test, TestingModule } from '@nestjs/testing';
import { CommitHistoryController } from './commit-history.controller';
import { CommitHistoryService } from './commit-history.service';

describe('CommitHistoryController', () => {
  let controller: CommitHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommitHistoryController],
      providers: [CommitHistoryService],
    }).compile();

    controller = module.get<CommitHistoryController>(CommitHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
