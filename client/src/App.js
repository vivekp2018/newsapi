import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Featured from "./components/layout/Featured";
import Footer from "./components/layout/Footer";
import Copyright from "./components/layout/Copyright";
import Login from "./components/auth/Login";
import { Route, BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";
import PrivateRoute from "./components/common/PrivateRoute";
import { authService } from "./utils/authservice";
import Redirect from "react-router-dom/Redirect";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";

class App extends Component {
  state = {
    loggedIn: false
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/" component={Featured} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/logout"
              render={props => {
                authService.logout();
                return <Redirect to="/" />;
              }}
            />

            <PrivateRoute exact path="/settings" component={Settings} />
            <Footer />
            <Copyright />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
