import Product from "@Models/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@app/api/auth/[...nextauth]/route";
export const GET = async (req, { params }) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    if (params?.id) {
      const product = await Product.findById(params.id);
      return new Response(JSON.stringify(product), { status: 201 });
    }
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    if (params?.id) {
      await Product.findByIdAndDelete(params.id);
      return new Response("Product Deleted Succesfully", { status: 201 });
    }
  } catch (error) {
    return new Response("Failed to delete Product", { status: 500 });
  }
};
