const postAPI = require("api-access");
const makeAddPost = require("./add-post");
const makeRemovePost = require("./remove-post");

const addPost = makeAddPost({ postAPI });
const removePost = makeRemovePost({ postAPI });

module.exports = {
  addPost,
  removePost,
};
