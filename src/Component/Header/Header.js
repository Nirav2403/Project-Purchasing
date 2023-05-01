import React from "react";
import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-row">
        <Button variant="primary" className="fb-primary-btn login-btn">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Header;
