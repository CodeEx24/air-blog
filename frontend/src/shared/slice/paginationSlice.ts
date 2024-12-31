import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnFilter, ColumnSort } from "@tanstack/react-table";

export interface PaginationState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  pageCount: number;
  totalRecords: number;
  filters: ColumnFilter[];
  sorting: ColumnSort[];
  isLoading: boolean;
  refetchData: boolean;
}

const initialState: PaginationState = {
  pagination: {
    pageIndex: 1,
    pageSize: 10,
  },
  pageCount: 0,
  totalRecords: 0,
  filters: [],
  sorting: [],
  isLoading: false,
  refetchData: false,
};

const tablePaginationSlice = createSlice({
  name: "pageDetails",
  initialState: initialState,
  reducers: {
    setPaginationDetails: (
      state,
      action: PayloadAction<{
        pagination: { pageIndex: number; pageSize: number };
        pageCount: number;
        totalRecords: number;
      }>
    ) => {
      const { pagination, pageCount, totalRecords } = action.payload;
      state.pagination = pagination;
      state.pageCount = pageCount;
      state.totalRecords = totalRecords;
    },
    setPagination: (
      state,
      action: PayloadAction<{
        pageIndex: number;
        pageSize: number;
      }>
    ) => {
      const { pageIndex, pageSize } = action.payload;
      state.pagination = { pageIndex, pageSize };
    },

    setPageSize: (
      state,
      action: PayloadAction<{
        pageSize: number;
      }>
    ) => {
      state.pagination.pageSize = action.payload.pageSize;
    },

    setPageIndex: (
      state,
      action: PayloadAction<{
        pageIndex: number;
      }>
    ) => {
      state.pagination.pageIndex = action.payload.pageIndex;
    },

    resetPagination: (state) => {
      state.pagination = { pageIndex: 1, pageSize: 10 };
      state.pageCount = 0;
      state.totalRecords = 0;
      state.filters = [];
    },

    setRefetchData: (state) => {
      state.refetchData = !state.refetchData;
    },

    setFilters: (
      state,
      action: PayloadAction<{
        id: string;
        value: string;
      }>
    ) => {
      const { id, value } = action.payload;

      if (state.filters) {
        if (id && value) {
          const filterIndex = state.filters.findIndex(
            (filter) => filter.id === id
          );

          if (filterIndex !== -1) {
            state.filters[filterIndex].value = value;
          } else {
            state.filters.push({ id, value });
          }
        } else {
          if (id) {
            state.filters = state.filters.filter((filter) => filter.id !== id);
          }
        }
      } else {
        state.filters = [{ id, value }];
      }
    },

    setSorting: (
      state,
      action: PayloadAction<{
        name: string;
        order: "asc" | "desc" | "";
      }>
    ) => {
      const { name, order } = action.payload;
      const isDescending = order === "desc";

      if (order === "") {
        state.sorting = state.sorting.filter((sort) => sort.id !== name);
        return;
      }

      const isSortExist = state.sorting.find((sort) => sort.id === name);

      if (isSortExist) {
        state.sorting = state.sorting.map((sort) =>
          sort.id === name ? { id: name, desc: isDescending } : sort
        );
      } else {
        state.sorting = [...state.sorting, { id: name, desc: isDescending }];
      }
    },

    setIsLoading: (
      state,
      action: PayloadAction<{
        loadingStatus: boolean;
      }>
    ) => {
      const { loadingStatus } = action.payload;
      state.isLoading = loadingStatus;
    },
  },
});

export const {
  setPaginationDetails,
  setPageSize,
  setPageIndex,
  resetPagination,
  setRefetchData,
  setPagination,
  setFilters,
  setSorting,
  setIsLoading,
} = tablePaginationSlice.actions;
export default tablePaginationSlice.reducer;

export const getPagination = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.pagination;
export const getTotalPageCount = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.pageCount;
export const getTotalRecords = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.totalRecords;
export const getFilters = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.filters;
export const getSorting = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.sorting;
export const getRefetchStatus = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.refetchData;

export const getIsLoading = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.isLoading;
