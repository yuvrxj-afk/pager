// Homepage.test.tsx
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "../components/Homepage";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

test("renders Homepage component with posts", () => {
  // Mock data for posts
  const mockPosts = {
    nbPages: 55,
    hits: [
      {
        author: "John Doe",
        title: "Post 1",
        created_at: "2024-01-24T07:44:39Z",
        url: "https://example.com/post1",
      },
      {
        author: "Jane Smith",
        title: "Post 2",
        created_at: "2024-01-24T08:30:15Z",
        url: "https://example.com/post2",
      },

      // nbPages:55,
    ],
  };
  // Mock function for navigate
  // const navigateMock = jest.fn();
  act(() => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", state: { mockPosts } }]}>
        <Homepage />
      </MemoryRouter>
    );
  });
});
// Initialize fetch mock
fetchMock.enableMocks();

test("renders Homepage component with posts", async () => {
  // Mock data for posts
  const mockPosts = [
    {
      author: "John Doe",
      title: "Post 1",
      created_at: "2024-01-24T07:44:39Z",
      url: "https://example.com/post1",
    },
    {
      author: "Jane Smith",
      title: "Post 2",
      created_at: "2024-01-24T08:30:15Z",
      url: "https://example.com/post2",
    },
  ];

  // Mock the fetch function
  fetchMock.mockResponseOnce(JSON.stringify({}));

  await act(async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", state: { mockPosts } }]}>
        <Homepage />
      </MemoryRouter>
    );
    // expect(getByText("Post 1")).toBeInTheDocument();
    // expect(getByText("Post 2")).toBeInTheDocument();
  });
});
