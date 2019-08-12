import React, { Component } from "react";
import http from "./services/httpServices";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = { posts: [] };
  async componentDidMount() {
    let posts = await http.get("https://jsonplaceholder.typicode.com/posts");
    setTimeout(() => {
      this.setState({ posts: posts.data });
    }, 2000);
  }

  deletePost = async post => {
    let { posts } = this.state;

    let deletingPost = await http.delete(
      "https://jsonplaceholder.typicode.com/posts/99" + post.id
    );

    if (deletingPost.status === 200) {
      let i = posts.indexOf(post);
      console.log(i);
      posts.splice(i, 1);
      this.setState({ posts });
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
                </tr>
              ))}
            </tbody>
          </table>
        );
      else {
        return <React.Fragment>Loading...</React.Fragment>;
      }
    };

    return <React.Fragment>{displayPosts(this.state.posts)}</React.Fragment>;
  }
}

export default App;
