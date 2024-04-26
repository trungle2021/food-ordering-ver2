import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom"

interface PublicRouteProps {
  component: React.ComponentType<any>;
  path: string
}
export const PublicRoute = ({component: Component, ...rest}: PublicRouteProps) => {
  const auth = useSelector((state: any) => state.auth);
  const isAuthenticated = auth.isLoggedIn;
  return (
    <Route 
      {...rest}
      render={(props: any) => 
        isAuthenticated
      ? <Redirect  to={{
        pathname: "/dashboard",
        state: { from: props.location }
      }}
      /> : <Component {...props} />
    }
    />
  )
}
