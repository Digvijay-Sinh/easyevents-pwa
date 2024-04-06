import React, { FC, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthData, useAuth } from "../../context/AuthProvider";

// interface ProtectedPageProps {
//   children: React.ReactNode;
// }

const ProtectedPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.accessToken) {
      console.log("====================================");
      console.log(auth?.accessToken);
      console.log("====================================");
      // If user is not authenticated, redirect to login page
      navigate("/login");
    }
  }, [auth]);

  return <Outlet />;
};

export default ProtectedPage;
