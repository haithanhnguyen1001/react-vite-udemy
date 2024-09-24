import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return <>{props.children}</>;
  } else {
    return (
      <Result
        status="403"
        title="Unauthorized"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to={"/login"}>Login</Link>
          </Button>
        }
      />
    );
  }
};
