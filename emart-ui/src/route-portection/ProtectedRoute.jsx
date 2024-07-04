import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isLoggedIn]);
  return <div>{isLoggedIn && props.children}</div>;
};

export default ProtectedRoute;
