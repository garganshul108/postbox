import React, { Component } from "react";
import http from "./services/httpServices";

class Post extends Component {
  state = {
    title: "",
    id: "",
    body: "",
    comments: []
  };

  async componentDidMount() {
    let { title, body, id } = this.props;
    let comments = await http.get(
      "https://jsonplaceholder.typicode.com/comments?postId=" + id
    );
    comments = comments.data;
    this.setState({ title, id, body, comments });
  }

  componentWillUnmount() {
    this.setState({ title: "", id: "", body: "", comments: [] });
  }
  render() {
    const { title, id, body, comments } = this.state;

    const renderComments = comments => {
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
            <h1>
              Post&nbsp;{id}:&nbsp;{title}
            </h1>
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
