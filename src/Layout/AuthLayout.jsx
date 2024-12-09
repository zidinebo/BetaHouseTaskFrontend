import React from "react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <Link>
        <img src="" alt="" />
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
