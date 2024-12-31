import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getPagination,
  getTotalPageCount,
  getTotalRecords,
  setPageIndex,
  setPageSize,
} from "@/shared/slice/paginationSlice";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const dispatch = useDispatch();

  const pagination = useSelector(getPagination);
  const pageCount = useSelector(getTotalPageCount);
  const totalRecords = useSelector(getTotalRecords);

  const lastItem =
    pagination.pageSize * pagination.pageIndex < totalRecords
      ? pagination.pageSize * pagination.pageIndex
      : totalRecords;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {(pagination.pageIndex - 1) * pagination.pageSize + 1} -{" "}
        {lastItem} out of {totalRecords.toLocaleString()} rows
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-foreground">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              let output = Number(value);
              if (isNaN(output) || output <= 0) {
                output = 10;
              }
              dispatch(setPageSize({ pageSize: output }));
              table.setPageSize(Number(output));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-foreground">
          Page {pagination.pageIndex} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex text-foreground"
            onClick={() => dispatch(setPageIndex({ pageIndex: 1 }))}
            disabled={!(pagination.pageIndex > 1)}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 text-foreground"
            onClick={() =>
              dispatch(
                setPageIndex({
                  pageIndex: pagination.pageIndex - 1,
                })
              )
            }
            disabled={!(pagination.pageIndex > 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 text-foreground"
            onClick={() =>
              dispatch(
                setPageIndex({
                  pageIndex: pagination.pageIndex + 1,
                })
              )
            }
            disabled={pagination.pageIndex === pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex text-foreground"
            onClick={() => dispatch(setPageIndex({ pageIndex: pageCount }))}
            disabled={pagination.pageIndex === pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
