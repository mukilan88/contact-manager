# React Contact Manager Application

This is a simple React-based Contact Manager application. It provides functionalities to add, edit, view, and delete contacts with persistent storage using `json-server`. The project is structured with reusable components and utilizes `react-router-dom` for navigation.

## File Structure

Project Directory\
├── db.json // JSON file to simulate a database\
├── package.json // NPM configuration file\
├── /src // Source folder for the React application\
│ ├── /components // Folder containing reusable components\
│ │ ├── Header.js // Header component for navigation\
│ │ ├── AddContact.js // Component to add a new contact\
│ │ ├── EditContact.js // Component to edit an existing contact\
│ │ ├── ContactList.js // Component to display the list of contacts\
│ │ └── ContactCard.js // Component to display individual contact details\
│ ├── App.js // Main application file with routes\
│ ├── index.js // Entry point for the React app\
│ └── index.css // Global styling file

## Installation and Setup

Clone the repository:

git clone https://github.com/mukilan88/contact-manager.git
cd contact-manager

## Install the necessary dependencies:

npm install react-router-dom axios uuid

# Components Overview

1. Header.js

Provides navigation links for the application.\
Links to "Add Contact" and "Contact List".

2. AddContact.js

Allows users to add new contacts by entering name and email.\
Saves the contact data to db.json using axios and updates localStorage for syncing.

3. EditContact.js

Allows users to edit existing contacts by fetching data from db.json using the contact ID.\
Updates the contact data in both db.json and localStorage.

4. ContactList.js

Displays the list of all contacts.\
Includes a search functionality to filter contacts by name or email.\
Allows deleting contacts and synchronizes updates with db.json and localStorage.

5. ContactCard.js

Displays individual contact details.\
Includes options to edit or delete the contact.
Routes\

### The application uses react-router-dom for navigation:

- /Displays the "Add Contact" page.
- /contact-list - Displays the list of all contacts.
- /edit/:id - Displays the "Edit Contact" page for the specified contact ID.

### Styling

Basic styling is included in index.css. You can customize the styles as needed.

### Dependencies

- react-router-dom: For routing between components.
- axios: For making HTTP requests to json-server.
- uuid: For generating unique IDs for new contacts.

## How to Run

Ensure json-server is running:

npx json-server --watch db.json --port 5000

http://localhost:5000/contacts

## Start the React app:

npm start

Open your browser and navigate to http://localhost:3000.
