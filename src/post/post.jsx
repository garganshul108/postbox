import React, { Component } from "react";
import http from "./services/httpServices";
import queryString from "query-string";
import postController from "./controller";

class Post extends Component {
  state = {
    title: "",
    id: "",
    body: "",
    comments: [],
  };

  async componentDidMount() {
    let query = queryString.parse(this.props.location.search);

    let { post } = postController.get({ query: query["post"] });

    this.setState({ ...post, comments }, () => {
      console.log(this.state);
    });
  }

  componentWillUnmount() {
    this.setState({ title: "", id: "", body: "", comments: [] });
  }
  render() {
    const { title, id, body, comments } = this.state;

    const renderComments = (comments) => {
      if (comments.length > 0)
        return (
          <table className="table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>BODY</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(({ name, email, body }) => (
                <tr>
                  <th>{name}</th>
                  <th>{email}</th>
                  <th>{body}</th>
                </tr>
              ))}
            </tbody>
          </table>
        );
      return <React.Fragment>Loading...</React.Fragment>;
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <br />
            <h1>Post&nbsp;{id}</h1>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">{renderComments(comments)}</div>
        </div>
      </div>
    );
  }
}

export default Post;
