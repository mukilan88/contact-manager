import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <h1>Contact Manager</h1>
      {/* link added to page the path added in the app component  */}
      <Link to="/">Add Contact</Link>
      {" | "}
      <Link to="/contact-list">Contact List</Link>
    </nav>
  );
}
