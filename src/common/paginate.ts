import { FindManyOptions, Repository } from "typeorm";
import { SORT_OPTIONS } from "./paginate.dto";

export interface PaginateQuery {
  take?: number;
  page?: number;
  sort?: SORT_OPTIONS
}

export async function paginate<T>({
  repository,
  query = { page: 1, sort: SORT_OPTIONS.DESC, take: 20 },
  findOptions = {},
  relations = []
}: {
  query: PaginateQuery;
  findOptions?: FindManyOptions<T>;
  repository: Repository<T>;
  relations?: Array<string>
}): Promise<any> {
  const take = query?.take || 10;
  const page = query?.page || 1;
  const skip = (page - 1) * take;

  delete query?.page;
  delete query?.take;

  if (query?.sort) {
    findOptions.order = { id: query.sort } as any;
  }
  delete query.sort;

  // findOptions.where = { ...findOptions.where, ...query } as any;

  const data = await repository.findAndCount({
    take: take,
    skip: skip,
    ...findOptions,
    relations
  });

  return paginateResponse(data, page, take);
}

export function paginateResponse(data: any[], page: number, limit: number) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    data: result,
    meta: {
      statusCode: "success",
      count: total,
      currentPage: +page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
      limit: +limit,
    },
  };
}
