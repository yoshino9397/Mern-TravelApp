import React from "react";
import "./register.css";
import PushPinIcon from "@mui/icons-material/PushPin";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="logo">
        <PushPinIcon/>
        YoshinoPin
      </div>

      <form>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="registerBtn">Register</button>
      </form>
    </div>
  );
};

export default Register;

/// 01:37:28 Mern Stack Login and Register System