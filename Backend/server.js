const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Models
const ShoppingList = require("./models/ShoppingList");

// REST API: Get a shopping list
app.get("/api/lists/:id", async (req, res) => {
  const list = await ShoppingList.findById(req.params.id);
  res.json(list);
});

// REST API: Add item
app.post("/api/lists/:id/items", async (req, res) => {
  const { name, quantity, price, sharedBy } = req.body;
  const list = await ShoppingList.findById(req.params.id);
  const newItem = { name, quantity, price, sharedBy };
  list.items.push(newItem);
  await list.save();

  io.to(req.params.id).emit("itemAdded", newItem);
  res.json(newItem);
});

// REST API: Update item
app.put("/api/lists/:listId/items/:itemId", async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const { name, quantity, price, sharedBy } = req.body;

    const list = await ShoppingList.findById(listId);
    if (!list) return res.status(404).json({ message: "List not found" });

    const item = list.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.name = name;
    item.quantity = quantity;
    item.price = price;
    item.sharedBy = sharedBy;

    await list.save();

    io.to(listId).emit("itemUpdated", item);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// REST API: Delete item
app.delete("/api/lists/:listId/items/:itemId", async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const list = await ShoppingList.findById(listId);
    if (!list) return res.status(404).json({ message: "List not found" });

    list.items = list.items.filter(item => item._id.toString() !== itemId);
    await list.save();

    io.to(listId).emit("itemDeleted", itemId);
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// WebSocket events
io.on("connection", socket => {
  console.log("New client connected");

  socket.on("joinList", listId => {
    socket.join(listId);
    console.log(`Socket joined list ${listId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
