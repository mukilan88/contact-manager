import React from "react";
import { Link } from "react-router-dom";

export function ContactCard({ contact, onDelete }) {
  return (
    <div>
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <Link to={`/edit/${contact.id}`}>Edit</Link>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
}
