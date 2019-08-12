import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import PostsDisplay from './PostsDisplay';
import Post from './post';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/comments" component={Post}></Route>
                <Route path="/" component={PostsDisplay}></Route>
            </Switch>
        );
    }
}

export default App;

