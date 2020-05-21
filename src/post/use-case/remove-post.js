const makeRemovePost = ({ postAPI }) => {
  const removePost = async ({ id }) => {
    await postAPI.deletePostById(id);
  };
  return removePost;
};

module.exports = makeRemovePost;
