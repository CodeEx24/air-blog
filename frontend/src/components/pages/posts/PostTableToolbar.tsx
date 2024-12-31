import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { postFilterConfig, facetConfig } from "./PostTableConfig";
import { DataTableFacetedFilter } from "../../common/table/DataTableFacetedFilter";
import { DataTableViewOptions } from "../../common/table/DataTableViewOptions";
import { debounce } from "@/lib/debounce";

import { AddEntityButton } from "../../common/AddEntityButton";
import {
  resetPagination,
  setFilters,
  setPageIndex,
  setRefetchData,
} from "@/shared/slice/paginationSlice";
import { PostForm } from "./PostForm";

interface PostTableToolbarProps<TData> {
  table: Table<TData>;
}

export function PostTableToolbar<TData>({
  table,
}: PostTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const dispatch = useDispatch();
  const [filtersState, setFiltersState] = useState<{ [key: string]: string }>(
    {}
  );
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    if (!isFiltered) {
      setFiltersState({});
    }
  }, [isFiltered]);
  const debouncedSetFilters = useMemo(() => {
    const debouncedFunction = debounce((key: string, value: string) => {
      dispatch(setFilters({ id: key, value }));
    }, 500);

    debounceRef.current = debouncedFunction;
    return debouncedFunction;
  }, [dispatch]);

  const handleInputChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPageIndex({ pageIndex: 1 }));
      const newValue = event.target.value;
      setFiltersState((prev) => ({ ...prev, [key]: newValue }));
      debouncedSetFilters(key, newValue);
    };

  const handleReset = () => {
    table.resetColumnFilters();
    dispatch(resetPagination());
    dispatch(setRefetchData());

    if (debounceRef.current) {
      debounceRef.current.cancel();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:flex items-center justify-between gap-2 mt-4 px-1">
        {postFilterConfig.map(({ placeholder, key }) => (
          <Input
            key={key}
            placeholder={placeholder}
            value={filtersState[key] || ""}
            onChange={handleInputChange(key)}
            className="h-8"
          />
        ))}

        {facetConfig.map(({ key, title, options }) =>
          table.getColumn(key) ? (
            <DataTableFacetedFilter
              key={key}
              column={table.getColumn(key)}
              title={title}
              options={options}
            />
          ) : null
        )}

        {isFiltered && (
          <Button
            variant="secondary"
            onClick={handleReset}
            className="h-8 px-2 lg:px-3 text-foreground"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <div className="flex flex-col md:flex-row gap-2">
          <DataTableViewOptions table={table} />
          <AddEntityButton
            FormComponent={PostForm}
            buttonLabel="Add Post"
            dialogTitle="Add Post"
            dialogDescription="Add the post details below by changing values."
          />
        </div>
      </div>
    </>
  );
}
