import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { MemoryRouter } from "react-router-dom";
import PostDetails from "../components/PostDetails";

const mockPost = {
  objectID: "123",
  author: "John Doe",
  title: "Test Post",
  created_at: "2024-01-24T07:44:39Z",
  url: "https://www.example.com/this/is/a/very/long/url/that/might/exceed/the/maximum/character/limi/fjsdfjdsklfjdklfsdjfdklfjsdlfksjdfkldsjfdsjfdjft",
};
const mockPost2 = {
  objectID: "123",
  author: "John Doe",
  title: "Test Post",
  created_at: "2024-01-24T07:44:39Z",
  url: "https://www.example.com/this/",
};
const mockPost3 = {
  objectID: "123",
  author: "John Doe",
  title: "Test Post",
  created_at: "2024-01-24T07:44:39Z",
};

test("renders PostDetails component with post details", () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/post", state: mockPost2 }]}>
      <PostDetails />
    </MemoryRouter>
  );
});
test("renders null when no url is given", () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: "/post", state: mockPost3 }]}>
      <PostDetails />
    </MemoryRouter>
  );
});

test("truncates long URLs", () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={[{ pathname: "/post", state: mockPost }]}>
      <PostDetails />
    </MemoryRouter>
  );

  const truncatedUrl = getByTestId("truncated-url");
  expect(truncatedUrl).toHaveTextContent("...");
});

// Verify that the post details are rendered
// });

// test("clicking on home icon redirects to homepage", () => {
//   // Mock the window.location.href method
//   delete window.location;
//   window.location = { href: "" };
//   const assignMock = jest.fn();
//   window.location.assign = assignMock;

//   render(
//     <BrowserRouter>
//       <PostDetails location={{ state: mockPost }} />
//     </BrowserRouter>
//   );

//   // Click on the home icon
//   screen.getByTestId("home-icon").click();

//   // Verify that window.location.href is set to "/"
//   expect(assignMock).toHaveBeenCalledWith("/");
// });
