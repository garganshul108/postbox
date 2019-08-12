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
              </tr>
            </thead>
            <tbody>
              {posts.map(({ id, title, body }) => (
                <tr>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
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
