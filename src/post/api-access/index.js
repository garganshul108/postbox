const httpService = require("../../../services/httpServices");

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const makeAPI = () => {
  return Object.freeze({
    post: (postInfo) => {
      httpService.post(baseURL, postInfo);
    },
  });
};
