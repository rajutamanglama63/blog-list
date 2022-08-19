import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
