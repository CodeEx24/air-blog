import { API_ENDPOINT } from "@/shared/constants/API_ENDPOINT";
import { apiSlice } from "./apiSlice";
import { buildQueryString } from "@/lib/tableQueryBuilder";
import { QueryParams } from "@/shared/interface/TableType";
import { ApiGetSlugResponse } from "@/shared/interface/IPost";

const postsPath = API_ENDPOINT.POSTS.PATH;

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${postsPath}${API_ENDPOINT.POSTS.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [{ type: "Post", data }],
    }),

    getPostBySlug: builder.query<ApiGetSlugResponse, string>({
      query: (slug: string) => {
        return `${postsPath}${API_ENDPOINT.POSTS.SLUG.replace(":slug", slug)}`;
      },
      providesTags: (_, __, slug) => [{ type: "Post", slug }],
    }),

    createPost: builder.mutation({
      query: (newPost) => {
        return {
          url: `${postsPath}${API_ENDPOINT.POSTS.CREATE}`,
          method: "POST",
          body: newPost,
        };
      },
      invalidatesTags: [{ type: "Post" }],
    }),

    updatePost: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${postsPath}${API_ENDPOINT.POSTS.UPDATE.replace(":id", id)}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (_, __, { slug }) => [
        { type: "Post", slug },
        { type: "Post" },
      ],
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `${postsPath}${API_ENDPOINT.POSTS.DELETE.replace(":id", id)}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { slug }) => [
        { type: "Post", slug },
        { type: "Post" },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
