export interface Pagination {
  previousPage: number | null;
  current: number;
  nextPage: number | null;
  total: number;
  pageSize: number;
}
