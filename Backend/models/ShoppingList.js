// models/ShoppingList.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  sharedBy: [String]
});

const ShoppingListSchema = new mongoose.Schema({
  name: String,
  members: [String],
  items: [ItemSchema]
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
