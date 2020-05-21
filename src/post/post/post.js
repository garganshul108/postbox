const buildMakePost = () => {
  const makePost = ({ user, id, title, body, comments }) => {
    let validUser;
    if (user) {
      validUser = makeUser(user);
    }

    let santizedTitle = undefined;
    if (title) {
      santizedTitle = sanitize(title);
    }

    return Object.freeze({
      getUser: () => validUser,
      getId: () => id,
      getTitle: () => santizedTitle,
      getBody: () => santizedBody,
      getComments: () => nestedComments,
    });
  };

  return makePost;
};

module.exports = buildMakePost;
