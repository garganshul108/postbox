const buildMakePost = require("./post");

const sanitize = (text) => text;
const makeComments = (comments) => comments;
const makeUser = (user) => user;

const makePost = buildMakePost({ sanitize, makeComments, makeUser });

module.exports = makePost;
