import axios from "axios";

const baseUrl = "/api/blogs";

// let token = null;

// const setToken = (newToken) => {
//   token = `bearer ${newToken}`;
// };

const createBlog = async (newBlog) => {
  const token = JSON.parse(window.localStorage.getItem("loggedInUser")).token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

export default { createBlog };
