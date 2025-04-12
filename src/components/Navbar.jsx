import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
        <h2 className="text-primary-100">Evalio</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
