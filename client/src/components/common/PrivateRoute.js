import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authService } from "../../utils/authservice";
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export default PrivateRoute;
