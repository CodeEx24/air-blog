import { QueryParams } from "@/shared/interface/TableType";
import { ColumnFilter } from "@tanstack/react-table";

export const buildQueryString = ({
  page,
  pageSize,
  filters = [],
  sorting = [],
}: QueryParams): string => {
  const filterParams = filters
    .map(({ id, value }: ColumnFilter) => {
      return `${id}=${encodeURIComponent(value as string)}`;
    })
    .filter(Boolean)
    .join("&");

  const sortingParams = sorting
    .map(({ id, desc }) => {
      return `sort_${id}=${desc ? "desc" : "asc"}`;
    })
    .join("&");

  const queryStringParts = [
    `page=${page}`,
    `pageSize=${pageSize}`,
    filterParams,
    sortingParams,
  ]
    .filter((part) => part !== "")
    .join("&");

  return queryStringParts;
};
