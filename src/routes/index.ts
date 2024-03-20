import React from 'react';
import { Route } from "react-router-dom";
import { Login } from '../components/Page/Auth/Login/Login';
import { ForgotPassword } from '../components/Page/Auth/ForgotPassword/ForgotPassword';
import { Register } from '../components/Page/Auth/Register/Register';
import { ResetPassword } from '../components/Page/Auth/ResetPassword/ResetPassword';
import RouteConfig from '../interface/route-config';

const routes: RouteConfig[] = [
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/register', component: Register },
  { path: '/reset-password', component: ResetPassword },
];

const Routes: React.FC = () => {
  return (
    // <>
    //   {routes.map((route: object, index: number) => (
    //     <RouteCustomize key={index} path={route.path} component={route.component} />
    //   ))}
    // </>
    <Route></Route>
  );
};

export default Routes;