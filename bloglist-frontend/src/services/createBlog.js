import axios from "axios";

const baseUrl = "/api/blogs";

const createBlog = async (newBlog) => {
  const request = axios.post(baseUrl, newBlog);
  return request.then((response) => response.data);
};

export default { createBlog };
