import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("CreateBlog component updates it's parents state", async () => {
  const createBlog = jest.fn();

  const user = userEvent.setup();

  render(<CreateBlog />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");

  const createButton = screen.getByText("create");

  createButton = createBlog();

  await user.type(title, "Blog title");
  await user.type(author, "John Doe");
  await user.type(url, "randomsite.com");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Blog title");
});
