import React from "react";
//router package added
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import EditContact from "./components/EditContact";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* path add to switch the page link from header component */}
        <Route path="/" element={<AddContact />} />
        <Route path="/contact-list" element={<ContactList />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Router>
  );
}
