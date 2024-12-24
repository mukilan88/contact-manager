import React from "react";
// Import React to define the main application component.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Router for enabling navigation, Routes for defining multiple routes,
// and Route for specifying individual routes.

import AddContact from "./components/AddContact";
// Import the AddContact component to handle adding new contacts.

import ContactList from "./components/ContactList";
// Import the ContactList component to display the list of contacts.

import EditContact from "./components/EditContact";
// Import the EditContact component to handle editing existing contacts.

import Header from "./components/Header";
// Import the Header component to provide navigation links.

export default function App() {
  // Define the App functional component, which acts as the root component.

  return (
    <Router>
      {/* Wrap the entire application with Router to enable routing functionality. */}

      <Header />
      {/* Include the Header component, which is always visible for navigation. */}

      <Routes>
        {/* Define all the routes for the application. */}

        {/* Route for adding a contact */}
        <Route path="/" element={<AddContact />} />
        {/* When the path is "/", render the AddContact component. */}

        {/* Route for viewing the contact list */}
        <Route path="/contact-list" element={<ContactList />} />
        {/* When the path is "/contact-list", render the ContactList component. */}

        {/* Route for editing a specific contact */}
        <Route path="/edit/:id" element={<EditContact />} />
        {/* When the path is "/edit/:id", render the EditContact component with the contact ID as a parameter. */}
      </Routes>
    </Router>
  );
}
