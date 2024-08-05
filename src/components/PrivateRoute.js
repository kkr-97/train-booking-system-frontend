import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, authToken, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  return authToken ? element : null;
};

export default PrivateRoute;
