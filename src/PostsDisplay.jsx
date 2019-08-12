import React, { Component } from "react";
import http from "./services/httpServices";

import { Link } from "react-router-dom";

class PostsDisplay extends Component {
  state = { posts: [] };
  async componentDidMount() {
    let posts = await http.get("https://jsonplaceholder.typicode.com/posts");
    setTimeout(() => {
      this.setState({ posts: posts.data });
    }, 2000);
  }

  deletePost = async post => {
    let { posts: originalPosts } = this.state;

    let updatedPosts = [...originalPosts];
    let i = updatedPosts.indexOf(post);
    console.log(i);
    updatedPosts.splice(i, 1);
    console.log("up", updatedPosts);
    console.log("or", originalPosts);
    this.setState({ posts: updatedPosts });

    let deletingPost = await http.delete(
      "https://jsonplaceholder.typicode.com/posts/" + post.id
    );
    console.log("ststus", deletingPost);
    if (deletingPost.status !== 200) {
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    const displayPosts = posts => {
      if (posts.length > 0)
        return (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>BODY</th>
                <th />
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.deletePost(post);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={e => alert("no option provided")}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <Link
                      className="btn btn-info"
                      to={"/comments?post=" + post.id}
                    >
                      View Full Post
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      else {
        return <React.Fragment>Loading...</React.Fragment>;
      }
    };

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              <br />
              <div className="row">
                <div className="col">
                  <h1>POSTS</h1>
                </div>
                <div className="col-3 text-right">
                  <button
                    className="btn btn-primary"
                    onClick={e => alert("no option provided")}
                  >
                    Add a post
                  </button>
                </div>
              </div>
              <a href="https://jsonplaceholder.typicode.com/posts/">
                https://jsonplaceholder.typicode.com/posts/
              </a>
              <br />
              {displayPosts(this.state.posts)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PostsDisplay;
