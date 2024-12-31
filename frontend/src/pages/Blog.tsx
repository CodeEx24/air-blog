import { Link, useParams } from "react-router";
import { useGetPostBySlugQuery } from "./api/postApiSlice";
import Typography from "@/components/common/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeviconPlainLinkedin } from "@/assets/socials/LinkedIn";
import { UilFacebook } from "@/assets/socials/Facebook";
import { FormkitInstagram } from "@/assets/socials/Instagram";
import HTMLRenderer from "@/components/common/HTMLRenderer";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function BlogPage() {
  const { slug } = useParams();

  const { data: postResponse, isLoading } = useGetPostBySlugQuery(
    slug as string
  );

  if (isLoading)
    return (
      <div className="py-6 lg:py-12 px-4 md:px-40 lg:px-60 space-y-6">
        Loading...
      </div>
    );

  return (
    <div className="py-6 lg:py-12 px-4 md:px-40 lg:px-60 space-y-6">
      <Typography variant={"heading1"}>{postResponse?.data.title}</Typography>
      <LazyLoadImage
        src={postResponse?.data.image || ""}
        alt="Featured Image"
        className="rounded-2xl w-full"
        effect="blur"
      />
      <div className="flex justify-between items-center px-6 pb-6 pt-4 border-b">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={postResponse?.data.author_image} />
            <AvatarFallback>{postResponse?.data.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <Typography className="text-xl font-semibold p-0">
              {postResponse?.data.author}
            </Typography>
            <Typography className="text-xs p-0">
              {postResponse?.data.created_at}
            </Typography>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/">
            <DeviconPlainLinkedin className="size-6" />
          </Link>
          <Link to="/">
            <UilFacebook className="size-6" />
          </Link>
          <Link to="/">
            <FormkitInstagram className="size-6" />
          </Link>
        </div>
      </div>
      <div>
        <HTMLRenderer content={postResponse?.data.content as string} />
      </div>
      <hr />
      <div className="space-y-8 lg:space-y-12 space-x-2">
        <Typography variant="heading4">Written by: </Typography>
        <div className="flex flex-col space-y-6">
          <div className="flex gap-6">
            <Avatar>
              <AvatarImage src={postResponse?.data.author_image} />
              <AvatarFallback>{postResponse?.data.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Typography variant={"heading4"} className=" font-bold">
                {postResponse?.data.author}
              </Typography>
              <Typography variant={"caption"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </div>
          </div>
          <Link to={"/"} className="text-violet-600 font-bold">
            Read More about {postResponse?.data.author}
          </Link>
        </div>
      </div>
    </div>
  );
}
