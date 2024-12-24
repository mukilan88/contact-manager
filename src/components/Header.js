import React from "react";
// Import React to define a functional component.

import { Link } from "react-router-dom";
// Import Link to create navigation links between pages.

export default function Header() {
  // Define the Header functional component, which is exported for use in other parts of the app.

  return (
    <nav>
      {/* Navigation bar container for the header links */}

      <h1>Contact Manager</h1>
      {/* Display the title of the application */}

      {/* Navigation links for different pages */}
      <Link to="/">Add Contact</Link>
      {/* Link to the "Add Contact" page ("/" route) */}

      {" | "}
      {/* Separator between the two links */}

      <Link to="/contact-list">Contact List</Link>
      {/* Link to the "Contact List" page ("/contact-list" route) */}
    </nav>
  );
}
