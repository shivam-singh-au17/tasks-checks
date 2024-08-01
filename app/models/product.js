const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    inventoryCount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
