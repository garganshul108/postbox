const makePost = require("../post");

const makeAddPost = ({ postAPI }) => {
  const addPost = async ({ ...postInfo }) => {
    const post = makePost(postInfo);

    const sentPost = await postAPI.sendPost({
      id: post.getId(),
      title: post.getTitle(),
      body: post.getBody(),
      user: {
        id: post.getUser().getId(),
      },
    });

    return sentPost;
  };

  return addPost;
};

module.exports = makeAddPost;
