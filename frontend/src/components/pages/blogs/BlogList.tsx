import BlogCard from "@/components/pages/blogs/BlogCard";
import { Post } from "@/shared/interface/IPost";
import Typography from "@/components/common/Typography";
import { useSelector } from "react-redux";
import { getIsLoading } from "@/shared/slice/paginationSlice";

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const isLoading = useSelector(getIsLoading);

  return (
    <>
      {posts.length > 0 && !isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 2xl:gap-20  ">
          {posts.map((data: Post) => (
            <BlogCard
              key={data.slug}
              image={data.image}
              author={data.author}
              date={data.created_at}
              title={data.title}
              metaDescription={data.content}
              slug={data.slug}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center py-20">
          <Typography>
            {isLoading ? "Loading..." : "No results found"}
          </Typography>
        </div>
      )}
    </>
  );
}
