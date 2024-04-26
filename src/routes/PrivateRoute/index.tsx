import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom'

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

export const PrivateRoute = ({component: Component, path, ...rest}:PrivateRouteProps) => {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoggedIn;
  return (
    <Route
      {...rest}
      path={path}
      render={(props:any) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>)}
    />
  );
}
