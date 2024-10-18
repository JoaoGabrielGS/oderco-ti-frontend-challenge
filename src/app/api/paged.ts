import { NextRequest } from "next/server";

export interface Paged<T> {
  items: T[],
  page: number,
  page_size: number,
  total_items: number,
  total_pages: number,
}

export interface PageParams {
  page: number,
  page_size: number,
  skip: number,
}

export function createPaged<T>(pageParams: PageParams, count: number, items: T[]): Paged<T> {
  return {
    items,
    page: pageParams.page,
    page_size: pageParams.page_size,
    total_items: count,
    total_pages: Math.ceil(count / pageParams.page_size)
  }
}

export function getPageParams(nextRequest: NextRequest): PageParams {
  const page = Number(nextRequest.nextUrl.searchParams.get('page') ?? 0);
  const page_size = Number(nextRequest.nextUrl.searchParams.get('page_size') ?? 15);
  const skip = page * page_size;

  return { page, page_size, skip };
}

export async function pagedQuery<T, Q>(entity: { count(): Promise<number>, findMany(query: Q): Promise<T[]> }, pageParams: PageParams, query = {} as Q) {
  const count = await entity.count();
  const items = await entity.findMany({ ...query, take: pageParams.page_size, skip: pageParams.skip });
  return createPaged(pageParams, count, items);
}