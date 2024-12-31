import Typography from "@/components/common/Typography";
import { ROUTE } from "@/shared/constants/ROUTE";
import { Link } from "react-router";

interface BlogCardType {
  image: string;
  author: string;
  date: string;
  title: string;
  metaDescription: string;
  slug: string;
}

export default function BlogCard({
  image,
  author,
  date,
  title,
  metaDescription,
  slug,
}: BlogCardType) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex-grow">
        <img
          src={image}
          alt={author}
          className="w-full md:h-60 rounded-xl object-cover"
        />
        <div className="flex gap-4 justify-between">
          <Typography className="font-semibold text-sm md:text-base ">
            {author}
          </Typography>
          <Typography className="text-sm md:text-base ">{date}</Typography>
        </div>
        <Typography className="text-2xl font-bold line-clamp-2">
          {title}
        </Typography>
        <Typography className="text-xl line-clamp-4 p-0">
          {metaDescription}
        </Typography>
      </div>
      <Link
        to={`${ROUTE.BLOGS.DEFAULT}/${slug}`}
        className="no-underline text-lg font-bold text-violet-500"
      >
        Read More...
      </Link>
    </div>
  );
}
