const { Schema, models, model } = require("mongoose");

const orderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    pCode: String,
    address: String,
    state: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);
export const Orders = models?.Orders || model("Orders", orderSchema);
