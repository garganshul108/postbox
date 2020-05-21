const buildMakePost = ({ sanitize, makeComments, makeUser }) => {
  const makePost = ({ user, id, title, body, comments }) => {
    let validUser;
    if (user) {
      validUser = makeUser(user);
    }

    let santizedTitle = undefined;
    if (title) {
      santizedTitle = sanitize(title);
    }

    let sanitizedBody = undefined;
    if (body) {
      sanitizedBody = sanitize(body);
    }

    let nestedComments = undefined;
    if (comments) {
      nestedComments = makeComments(comments);
    }

    return Object.freeze({
      getUser: () => validUser,
      getId: () => id,
      getTitle: () => sanitizedTitle,
      getBody: () => sanitizedBody,
      getComments: () => nestedComments,
    });
  };

  return makePost;
};

module.exports = buildMakePost;
