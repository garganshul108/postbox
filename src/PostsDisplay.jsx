import React, { Component } from "react";
import http from "./services/httpServices";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class PostsDisplay extends Component {
  state = {
    posts: [],
    searchQuery: "",
    pageSize: 1,
    currentPage: 1,
    pageCount: 10
  };

  async componentDidMount() {
    let { data: posts } = await http.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    let pageSize = 4;
    let pageCount = Math.ceil(posts.length / pageSize);
    this.setState({ posts, pageSize, pageCount }, () => {
      console.log(this.state);
    });
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

  filteredBySearch = posts => {
    posts = posts.filter(post => post.title.startsWith(this.state.searchQuery));
    return posts;
  };

  paginate = posts => {
    let { pageSize, currentPage } = this.state;
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(pageSize + startIndex, posts.length);
    posts = posts.slice(startIndex, endIndex);
    return posts;
  };

  render() {
    const displayPosts = posts => {
      if (posts.length > 0)
        return (
          <table className="table table-responsive">
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
                      onClick={e => toast.info("no option provided")}
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
        return <React.Fragment>No posts available...</React.Fragment>;
      }
    };

    const renderPageElement = pageCount => {
      let pages = [];
      let pageInserted = [];
      const { currentPage } = this.state;
      for (let i = 1; i < pageCount + 1; i++) pageInserted[i] = false;
      pageInserted[1] = true;
      pageInserted[pageCount] = true;
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 0 && i <= pageCount) pageInserted[i] = true;
      }
      pages.push(
        <li className={currentPage < 2 ? "page-item disabled" : "page-item"}>
          <Link
            className="page-link"
            onClick={() => {
              let { currentPage } = this.state;
              if (currentPage < 2) return;
              currentPage = currentPage - 1;
              this.setState({ currentPage });
            }}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </Link>
        </li>
      );

      for (let i = 1; i < pageCount; i++) {
        if (pageInserted[i]) {
          pages.push(
            <li
              className={currentPage === i ? "page-item disabled" : "page-item"}
            >
              <Link
                className="page-link"
                onClick={({ currentTarget }) => {
                  this.setState({
                    currentPage: parseInt(currentTarget.innerHTML)
                  });
                }}
              >
                {i}
              </Link>
            </li>
          );
        } else if (pageInserted[i - 1]) {
          pages.push(
            <li className="page-item disabled dots">
              <Link className="page-link">...</Link>
            </li>
          );
        }
      }

      pages.push(
        <li
          className={
            currentPage === pageCount ? "page-item disabled" : "page-item"
          }
        >
          <Link
            className="page-link"
            onClick={({ currentTarget }) => {
              this.setState({
                currentPage: parseInt(currentTarget.innerHTML)
              });
            }}
          >
            {pageCount}
          </Link>
        </li>
      );
      pages.push(
        <li
          className={
            currentPage > this.state.pageCount - 1
              ? "page-item disabled"
              : "page-item"
          }
        >
          <Link
            className="page-link"
            onClick={() => {
              let { currentPage, pageCount } = this.state;
              if (currentPage > pageCount - 1) return;
              currentPage = currentPage + 1;
              this.setState({ currentPage });
            }}
          >
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </Link>
        </li>
      );
      if (pages.length < 9) {
        let index = 0;
        for (let i = 0; i < pages.length; i++) {
          console.log();
          if (pages[i].props.className.split(" ").includes("dots")) {
            index = i;
            break;
          }
        }

        let diff = 9 - pages.length;
        for (let i = 0; i < diff; i++) {
          pages.splice(
            index,
            0,
            <li className="page-item disabled">
              <Link className="page-link">...</Link>
            </li>
          );
        }
      }
      return pages;
    };

    return (
      <main>
        <div className="container">
          {/* main box */}
          <div className="row">
            <div className="col-12 col-sm-12">
              <br />
              <div className="row">
                {/* top bar with heading seach and button */}
                <div className="col-12 col-sm-12  col-md-3 text-center">
                  {/* heading */}
                  <h1 className="display-5">POSTS</h1>
                </div>
                <div className="col-12 col-sm-10 col-md-7">
                  {/* search */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                    <input
                      type="search"
                      value={this.state.searchQuery}
                      onChange={({ currentTarget }) => {
                        console.log("changin");
                        this.setState({
                          searchQuery: currentTarget.value,
                          currentPage: 1
                        });
                      }}
                      className="form-control"
                      placeholder="Search Post"
                      aria-label="Search Post"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-2 col-md-2 text-center">
                  {/* button of add post */}
                  <button
                    className="btn btn-primary"
                    onClick={e => toast.info("no option provided")}
                  >
                    Add a post
                  </button>
                </div>
              </div>
              <div className="row">
                {/* contains the link to JSONPLACEHOLDER */}
                <div className="col-12 text-center">
                  <a href="https://jsonplaceholder.typicode.com/posts/">
                    https://jsonplaceholder.typicode.com/posts/
                  </a>
                </div>
              </div>

              {/* <div className="row">
                <div className="col-12 text-center">
                  <ul
                    className="pagination pagination-responsive"
                    style={{ margin: "auto", width: "max-content" }}
                  >
                    {renderPageElement(this.state.pageCount)}
                  </ul>
                </div>
              </div> */}
              <br />
              <div className="row">
                <div className="col-12">
                  {displayPosts(
                    this.paginate(this.filteredBySearch(this.state.posts))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default PostsDisplay;
