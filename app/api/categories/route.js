import { Category } from "@Models/categories";
import { mongooseConnect } from "@lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";

export const POST = async (req, res) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const { name, parentCategory, properties } = await req.json();
    const category = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to post categories", { status: 500 });
  }
};
export const GET = async (req, res) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const categories = await Category.find().populate("parent");
    return new Response(JSON.stringify(categories), { status: 201 });
  } catch (error) {
    return new Response("Failed to get categories", { status: 500 });
  }
};
