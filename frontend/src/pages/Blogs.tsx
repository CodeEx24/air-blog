import { useState } from "react";
import { useGetPostsQuery } from "./api/postApiSlice";

import Typography from "@/components/common/Typography";
import SearchBar from "@/components/pages/blogs/SearchBar";
import BlogList from "@/components/pages/blogs/BlogList";
import PaginationControls from "@/components/pages/blogs/PaginationControl";
import { STATUS } from "@/shared/constants/STATUS";
import { BlogSettingsDetailsType } from "@/shared/interface/IPost";

export default function BlogsPage() {
  const [blogSettingDetails, setBlogSettingDetails] =
    useState<BlogSettingsDetailsType>({
      page: 1,
      pageSize: 12,
      filters: [{ id: "status", value: STATUS.Published }],
      sorting: [],
    });

  const {
    data: postsResponse,
    refetch,
    isFetching,
  } = useGetPostsQuery(blogSettingDetails);

  const handleAddMoreSize = () => {
    setBlogSettingDetails({
      ...blogSettingDetails,
      pageSize: blogSettingDetails.pageSize + 6,
    });
    refetch();
  };

  const handleSearchBlogChange = (value: string) => {
    setBlogSettingDetails((prevState) => {
      return {
        ...prevState,
        filters: prevState.filters.map((filter) =>
          filter.id === "title" ? { ...filter, value } : filter
        ),
      };
    });

    refetch();
  };

  return (
    <div className="py-6 lg:py-12 px-4 md:px-8 lg:px-20 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <Typography variant={"heading1"}>Blog Posts</Typography>
        <SearchBar onSearch={handleSearchBlogChange} />
      </div>
      <hr />
      {postsResponse?.data.items.length > 0 ? (
        <>
          <BlogList posts={postsResponse?.data.items || []} />

          <PaginationControls
            hasNextPage={
              postsResponse.data.pagination.pageIndex <
              postsResponse.data.totalRecords
            }
            onLoadMore={handleAddMoreSize}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-60">
          <Typography>{isFetching ? "Loading..." : "No data found"}</Typography>
        </div>
      )}
    </div>
  );
}
