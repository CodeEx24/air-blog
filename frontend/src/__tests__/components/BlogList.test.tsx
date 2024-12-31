import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Post } from "@/shared/interface/IPost";
import BlogList from "@/components/pages/blogs/BlogList";
import { STATUS } from "@/shared/constants/STATUS";
import { setIsLoading } from "@/shared/slice/paginationSlice";
import { BrowserRouter } from "react-router";
import { store } from "@/lib/store";

describe("BlogList", () => {
  const mockPosts: Post[] = [
    {
      slug: "slug1",
      title: "Test Blog 1",
      content: "Test content 1",
      image: "image1.jpg",
      author: "Author 1",
      created_at: "2024-01-01",
      id: "1",
      author_image: "author1.jpg",
      tags: "tag1,tag2",
      status: STATUS.Published,
    },
    {
      slug: "slug2",
      title: "Test Blog 2",
      content: "Test content 2",
      image: "image2.jpg",
      author: "Author 2",
      created_at: "2024-01-02",
      id: "2",
      author_image: "author2.jpg",
      tags: "tag3,tag4",
      status: STATUS.Draft,
    },
  ];

  it("displays 'Loading...' when isLoading is true", () => {
    store.dispatch(setIsLoading({ loadingStatus: true }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogList posts={[]} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays 'No results found' when posts are empty and isLoading is false", () => {
    store.dispatch(setIsLoading({ loadingStatus: false }));

    render(
      <Provider store={store}>
        <BlogList posts={[]} />
      </Provider>
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders blog cards correctly when posts are provided", async () => {
    store.dispatch(setIsLoading({ loadingStatus: false }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogList posts={mockPosts} />
        </BrowserRouter>
      </Provider>
    );

    const blogTitles = await screen.findAllByText(/Test Blog/i);

    expect(blogTitles.length).toBe(mockPosts.length);
  });
});
