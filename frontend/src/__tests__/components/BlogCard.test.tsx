import BlogCard from "@/components/pages/blogs/BlogCard";
import { ROUTE } from "@/shared/constants/ROUTE";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";

const mockProps = {
  image: "https://example.com/image.jpg",
  author: "Author Name",
  date: "2024-12-29",
  title: "Test Blog Title",
  metaDescription: "This is a description of the blog post.",
  slug: "test-blog-slug",
};

describe("BlogCard Component", () => {
  test("renders BlogCard with given props", () => {
    render(
      <BrowserRouter>
        <BlogCard {...mockProps} />
      </BrowserRouter>
    );

    const image = screen.getByAltText(mockProps.author);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);

    expect(screen.getByText(mockProps.author)).toBeInTheDocument();
    expect(screen.getByText(mockProps.date)).toBeInTheDocument();

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.metaDescription)).toBeInTheDocument();

    const link = screen.getByText("Read More...");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `${ROUTE.BLOGS.DEFAULT}/${mockProps.slug}`
    );
  });
});
