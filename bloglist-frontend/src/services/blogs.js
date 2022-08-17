import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlogDetail = (id) => {
  const request = axios.get(`baseUrl/${id}`);

  return request.then((response) => response.data);
};

const updateBlog = (id, newBlog) => {
  const token = JSON.parse(window.localStorage.getItem("loggedInUser")).token;

  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const request = axios.put(`baseUrl/${id}`, newBlog, config);

  return request.then((response) => response.data);
};

export default { getAll, getBlogDetail, updateBlog };
