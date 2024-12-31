import { ColumnFilter, ColumnSort } from "@tanstack/react-table";

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  author_image: string;
  image: string;
  slug: string;
  tags: string;
  status: "Draft" | "Published" | "Archived";
  created_at: string;
  updated_at?: string;
}

export interface ApiGetSlugResponse {
  success: boolean;
  data: Post;
}

export interface ApiGetPostResponse {
  success: boolean;
  data: {
    items: Post[];
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
    pageCount: number;
    totalRecords: number;
  };
}

export interface BlogSettingsDetailsType {
  page: number;
  pageSize: number;
  filters: ColumnFilter[];
  sorting: ColumnSort[];
}
