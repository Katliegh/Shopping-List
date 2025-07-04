# Collaborative Shopping List App
A simple app to create and manage shopping lists with real-time updates using React (frontend), Express + MongoDB (backend), and Socket.io for live syncing.

# Creators
# Katlegokatzu@gmail.com

# Features
-Create, view, and manage shopping lists
-Add, edit, and delete items with quantity, price, and who shares the cost
-Real-time updates so all users see changes instantly
-User-friendly interface with clear data tables and input forms

# Technologies
-Frontend: React, Axios, Socket.io-client

-Backend: Node.js, Express, MongoDB (Mongoose), Socket.io

-Communication: REST API + WebSocket (Socket.io)

-Styling: Inline styles (can be moved to CSS)


# How It Works
-The React frontend connects to the backend via REST API to fetch and update shopping lists.
-It uses Socket.io client to join the shopping list room and listen for real-time item changes.
-Adding, editing, or deleting items updates the backend and notifies all connected clients instantly.
-The UI displays the list name, a form to add items, and a table showing all items with Edit/Delete actions.

# API Endpoints (Backend)

-GET	/api/lists/:id	Fetch shopping list by ID
-POST	/api/lists/:id/items	Add a new item to the list
-PUT	/api/lists/:listId/items/:itemId	Update an existing item
-DELETE	/api/lists/:listId/items/:itemId	Delete an item from the list

# Socket.io Events

-joinList	Join a room for a specific list
-itemAdded	Broadcast when an item is added
-itemUpdated	Broadcast when an item is edited
-itemDeleted	Broadcast when an item is deleted

# Folder Structure
markdown
Copy
Edit
/backend
  - server.js
  - models/
    - ShoppingList.js
/frontend
  - src/
    - App.js
    - components/
    - ...

# Notes
-Make sure your MongoDB server is running and accessible.
-The backend uses embedded documents for items inside a ShoppingList.
-Frontend assumes backend runs on port 5000; update URLs if different.
-Feel free to move inline styles in the frontend to CSS or styling libraries.

