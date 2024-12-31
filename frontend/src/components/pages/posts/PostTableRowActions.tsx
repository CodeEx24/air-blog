import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { ResponsiveDialog } from "../../common/ResponsiveDialog";
import { tablePostSchema } from "@/shared/schema/postSchema";
import { Status, STATUS } from "@/shared/constants/STATUS";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/pages/api/postApiSlice";
import { TOAST_TYPE } from "@/shared/constants/TOAST";
import { useCustomToast } from "@/hooks/useCustomToast";
import { ErrorResponse } from "@/shared/interface/ErrorType";
import { PostForm } from "./PostForm";
import { useNavigate } from "react-router";
import { ROUTE } from "@/shared/constants/ROUTE";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { showToast } = useCustomToast();
  const navigate = useNavigate();
  const post = tablePostSchema.parse(row.original);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleClick = async (value: Status) => {
    try {
      const { id, ...updates } = post;
      updates.status = value;
      const response = await updatePost({ id, updates }).unwrap();

      showToast(TOAST_TYPE.SUCCESS, response.message);
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(TOAST_TYPE.ERROR, "No server error response");
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, "Missing email or password!");
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, "Unauthorized");
      } else {
        showToast(TOAST_TYPE.ERROR, "Login Failed");
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await deletePost({
        id: post.id,
      }).unwrap();
      showToast(TOAST_TYPE.SUCCESS, result?.message);
    } catch (error) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(TOAST_TYPE.ERROR, "No server error response");
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, "Missing username or password!");
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, "Unauthorized");
      } else {
        showToast(TOAST_TYPE.ERROR, "Login Failed");
      }
    }
  };

  const handleViewBlogPost = () => {
    navigate(`${ROUTE.BLOGS.DEFAULT}/${post.slug}`);
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Edit Post"
        description="Update the post details below by changing values."
      >
        <PostForm setShowDialog={setIsUpdateOpen} post={post} />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted text-foreground"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleClick("Draft")}
            >
              {STATUS.Draft}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleClick("Published")}
            >
              {STATUS.Published}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => handleClick("Archived")}
            >
              {STATUS.Archived}
            </DropdownMenuItem>
          </>
          <hr />

          {/* FOR RESPONSIVE DIALOG */}
          {post.status === "Published" && (
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={handleViewBlogPost}
            >
              View
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => {
              setIsUpdateOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={handleDeleteAccount}
          >
            Delete
          </DropdownMenuItem>

          {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
