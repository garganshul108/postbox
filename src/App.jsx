import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import PostsDisplay from "./PostsDisplay";
import Post from "./post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "20"
          }}
        >
          <ToastContainer />
        </div>
        <Switch>
          <Route path="/comments" component={Post} />
          <Route path="/" component={PostsDisplay} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
