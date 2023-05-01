import React from "react";
import { ReactComponent as Logo } from "../../Svg/logo.svg";
import { Button } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="company-logo">
        <Logo />
      </div>
      <div className="subscribe-field">
        <input placeholder="Enter your email" />
        <Button className="fb-primary-btn">Subscribe</Button>
      </div>
    </div>
  );
};

export default Footer;
