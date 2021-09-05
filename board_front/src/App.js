import React, { Component, useState } from "react";
import "./css/bootstrap.min.css";
import "./App.css";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import write from "./components/write";
import ListBoardComponent from "./components/ListBoardComponent";
import HeaderComponent from "./components/HeaderComponent";
import detail from "./components/detailComponent";

class App extends Component {
  handleChange = (event) => this.setState({ value: event.target.value });

  handleSubmit = (event) => {
    alert(this.state.value);
    event.preventDefault();
  };
  render() {
    const cors = require("cors");
    return (
      <div>
        <Router>
          <div>
            <HeaderComponent />
            <Switch>
              <Route exact path="/" component={ListBoardComponent} />
              <Route path="/board" component={ListBoardComponent} />
              <Route path="/write/:idx" component={write} />
              <Route path="/detail/:idx" component={detail} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    App.use(cors());
  }
}

export default App;
