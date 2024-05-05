import { NAME } from "@/constants";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-sm font-thin">
      <span>
        © {new Date().getFullYear()} {NAME} all rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
