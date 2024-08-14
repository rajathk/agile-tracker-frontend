import axios from "axios";

const config = (auth) => {
  return {
    headers: { Authorization: `Bearer ${auth}` },
  };
};

//Get Method
export const get = (path, auth = "") => {
  return axios
    .get(path, config(auth))
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

//post
export const post = (path, body = {}, auth = "") => {
  return axios
    .post(path, body, config(auth))
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

//put
export const put = (path, body = {}, auth = "") => {
  return axios
    .put(path, body, config(auth))
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

//delete Method
export const del = (path, auth = "") => {
  return axios
    .delete(path, config(auth))
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
