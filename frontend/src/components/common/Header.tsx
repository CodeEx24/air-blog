import { SkillIconsAstro } from "@/assets/logo/Astro";
import Typography from "./Typography";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ROUTE } from "@/shared/constants/ROUTE";

export default function Header() {
  return (
    <header className="sticky top-0  backdrop-blur-lg z-10 border-b-[1px] p-container py-6 flex justify-between">
      <div className="flex items-center gap-4">
        <SkillIconsAstro className="size-12" />
        <Link to={ROUTE.HOME} className="no-underline">
          <Typography className="text-3xl font-bold p-0">AirBlog</Typography>
          <Typography className="text-sm text-gray-500 p-0">
            Blog Fresh Insights
          </Typography>
        </Link>
      </div>
      <div className="space-x-6 flex justify-center items-center">
        <Link to={ROUTE.HOME} className="font-semibold text-lg no-underline">
          Home
        </Link>
        <Link
          to={ROUTE.BLOGS.DEFAULT}
          className="font-semibold text-lg no-underline"
        >
          Blogs
        </Link>
        <Button className="text-lg rounded-lg">Submit Blog Post</Button>
      </div>
    </header>
  );
}
