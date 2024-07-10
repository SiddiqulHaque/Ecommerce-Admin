import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    Pname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [{ type: String }],
    },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);
const Product = models.Product || model("Product", ProductSchema);
export default Product;
