import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom'

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  routeIfNotMatch?: string;
  requiredParams?: string[];
  path: string;
}

export const PrivateRoute = ({component: Component, path, requiredParams, routeIfNotMatch, ...rest}:PrivateRouteProps) => {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoggedIn;
  return (
    <Route
      {...rest}
      path={path}
      render={(props: any) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }
        // Check each required parameter in the path
        if(requiredParams) {
          for (const param of requiredParams) {
            if (!props.match.params[param]) {
              return <Redirect to={routeIfNotMatch} />;
            }
          }
        }
        return <Component {...props} />;
      }}
    />
  );
}
