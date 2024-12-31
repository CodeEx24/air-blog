import DataTable from "@/components/common/table/DataTable";
import Typography from "@/components/common/Typography";
import { postColumns } from "@/components/pages/posts/PostTableConfig";
import { PostTableToolbar } from "@/components/pages/posts/PostTableToolbar";
import {
  getFilters,
  getPagination,
  getSorting,
  setIsLoading,
  setPaginationDetails,
} from "@/shared/slice/paginationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetPostsQuery } from "./api/postApiSlice";
import { useEffect } from "react";

export default function HomePage() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);

  const { data: postsResponse, isFetching } = useGetPostsQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });
  useEffect(() => {
    dispatch(setIsLoading({ loadingStatus: isFetching }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  useEffect(() => {
    if (postsResponse?.success) {
      dispatch(
        setPaginationDetails({
          pagination: postsResponse.data.pagination,
          pageCount: postsResponse.data.pageCount,
          totalRecords: postsResponse.data.totalRecords,
        })
      );
    }
  }, [postsResponse, dispatch]);

  return (
    <div className="flex justify-center px-4 lg:px-40 py-12 w-full bg-white">
      <div className="w-full">
        <Typography variant={"heading1"} className="px-4">
          Blog Posts Management
        </Typography>
        <div className="p-4">
          <DataTable
            columns={postColumns}
            data={postsResponse?.data?.items || []}
            ToolbarComponent={PostTableToolbar}
          />
        </div>
      </div>
    </div>
  );
}
