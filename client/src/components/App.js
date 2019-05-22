import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { loadUser } from "../actions/authActions";

import "../assets/css/main.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Landing from "./layout/Landing";
import SelectedWebcam from './layout/SelectedWebcam'
import WebcamPageLayout from "./layout/WebcamPageLayout";
import Register from "./user/Register";
import Login from "./user/Login";
import Profile from "./user/Profile";


class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
            <Header />
            <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register"  component={Register} />
            <Route path="/login"  component={Login} />
            <Route path="/selected_webcam/:id"  component={SelectedWebcam} />
            <Route path="/user/:id"  component={Profile} />
            <Route
              path="/webcams/:type/:value/:name"
              exact
              component={WebcamPageLayout}
            />
            </Switch>
            <Footer />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
