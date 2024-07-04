import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OpenRoute = (props) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return <div>{!isLoggedIn && props.children}</div>;
};

export default OpenRoute;
