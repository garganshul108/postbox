import React, { Component } from "react";
import http from "./services/httpServices";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = { posts: [] };
  async componentDidMount() {
    let posts = await http.get("https://jsonplaceholder.typicode.com/posts");
    this.setState({ posts: posts.data });
  }

  render() {
    const displayPosts = posts => {
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
    };
    return <React.Fragment>{displayPosts(this.state.posts)}</React.Fragment>;
  }
}

export default App;
