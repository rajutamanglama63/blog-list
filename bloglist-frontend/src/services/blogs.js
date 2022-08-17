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

const updateBlog = (id) => {
  const request = axios.put(`baseUrl/${id}`);

  return request.then((response) => response.data);
};

export default { getAll, getBlogDetail, updateBlog };
