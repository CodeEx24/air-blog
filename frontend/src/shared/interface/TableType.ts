import { ColumnFilter, ColumnSort } from "@tanstack/react-table";

export interface FilterType {
  [key: string]: string | undefined;
}
export interface SortingType {
  name?: string;
  order?: "asc" | "desc" | undefined;
}

export type QueryParams = {
  page: number;
  pageSize: number;
  filters?: ColumnFilter[];
  sorting?: ColumnSort[];
};
