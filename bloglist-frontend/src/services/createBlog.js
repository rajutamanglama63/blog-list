import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

export default { createBlog, setToken };
