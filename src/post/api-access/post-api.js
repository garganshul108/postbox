module.exports = ({ makeAPI }) => {
  
  const sendPost = ({...postInfo}) => {
    const api = await makeAPI();
    const result = await api.post(postInfo);
    return result;
  }

  return Object.freeze({
    sendPost,
    deletePostById,
  });
};
