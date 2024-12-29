export interface PaginationParams {
  amount: number;
  page: number;
}

export interface SearchFilters extends PaginationParams {
  search?: string;
}
