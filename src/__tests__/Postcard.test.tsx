import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostCard from "../components/PostCard";
import { BrowserRouter } from "react-router-dom";

fetchMock.enableMocks();

test("renders PostCard component with post details", () => {
  const post = {
    author: "John Doe",
    title: "Sample Post",
    created_at: "2024-01-24T07:44:39Z",
    url: "https://example.com",
  };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <PostCard post={post} key={1} navigate={() => {}} />
    </BrowserRouter>
  );

  // Verify that the post details are rendered correctly
  expect(getByText(`${post.title}`)).toBeInTheDocument();
  // expect(screen.getByText(`Author - `)).toBeInTheDocument();
  expect(getByTestId("truncated-url")).toBeInTheDocument();
});

test("truncates long URLs", () => {
  const longUrl =
    "https://www.example.com/this/is/a/very/long/url/that/might/exceed/the/maximum/character/limi/fjsdfjdsklfjdklfsdjfdklfjsdlfksjdfkldsjfdsjfdjft";

  const { getByTestId } = render(
    <BrowserRouter>
      <PostCard
        post={{ author: "", title: "", created_at: "", url: longUrl }}
        key={1}
        navigate={() => {}}
      />
    </BrowserRouter>
  );

  const truncatedUrl = getByTestId("truncated-url");
  expect(truncatedUrl).toHaveTextContent("...");
});

test("return null if url is not given  ", () => {
  const longUrl = "";
  const { getByTestId } = render(
    <BrowserRouter>
      <PostCard
        post={{ author: "", title: "", created_at: "", url: longUrl }}
        key={1}
        navigate={() => {}}
      />
    </BrowserRouter>
  );

  const truncatedUrl = getByTestId("truncated-url");
  expect(truncatedUrl).not.toHaveTextContent("...");
});

test("navigates to post details on click", async () => {
  const post = {
    author: "John Doe",
    title: "Sample Post",
    created_at: "2024-01-24T07:44:39Z",
    url: "https://example.com",
  };
  fetchMock.mockResponseOnce(JSON.stringify({}));

  const { getByTestId } = render(
    <BrowserRouter>
      <PostCard post={post} key={1} navigate={() => {}} />
    </BrowserRouter>
  );

  // Click the PostCard to trigger navigation
  await act(async () => {
    fireEvent.click(getByTestId("postcard-id"));
  });

  // expect(fetchMock).toHaveBeenCalledWith("/post", { state: {} });
});
