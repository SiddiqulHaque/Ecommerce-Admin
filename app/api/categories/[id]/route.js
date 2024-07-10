import { Category } from "@Models/categories";
import { isAdminRequest } from "@app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@lib/mongoose";

export const DELETE = async (req, { params }) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    await Category.findByIdAndDelete(params.id);
    return new Response("Category Deleted Successfully ", { status: 201 });
  } catch (error) {
    return new Response("Failed to delete Category", { status: 500 });
  }
};
export const PUT = async (req, { params }) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const { name, parentCategory,properties } = await req.json();
    const updatedCateg = await Category.findByIdAndUpdate(params.id, {
      name,
      parent: parentCategory || undefined,
      properties
    });
    return new Response(JSON.stringify(updatedCateg), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update Category", { status: 500 });
  }
};
