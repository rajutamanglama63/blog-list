import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "title of the blog",
    author: "author of the blog",
  };

  // render(<Blog blog={blog} />);

  // const element = screen.getByText("title of the blog");

  // expect(element).toBeDefined();

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("title of the blog");
  expect(div).toHaveTextContent("author of the blog");
});

test("clicking the button renders url and likes", async () => {
  const blog = {
    title: "title of the blog",
    author: "author of the blog",
    url: "http://blogSite.com/",
    likes: 0,
    user: {
      username: "John@23",
      name: "John Doe",
      id: "asdg8g8920dllldki90e",
    },
  };

  const User = {
    username: "John@23",
    name: "John Doe",
    id: "asdg8g8920dllldki90e",
  };

  const { container } = render(<Blog blog={blog} user={User} />);

  const user = userEvent.setup();

  const button = container.querySelector(".show");

  await user.click(button);

  const url = container.querySelector(".url");

  const likes = container.querySelector(".likes");

  expect(url).toHaveTextContent("http://blogSite.com/");
  expect(likes).toHaveTextContent("likes:0");
});
