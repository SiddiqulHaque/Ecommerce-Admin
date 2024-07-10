import Product from "@Models/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]/route";
export const POST = async (req, res) => {
  await mongooseConnect();
  await isAdminRequest();
  // console.log(req.body);
  const { Pname, description, price, images, category, productProp } =
    await req.json();
  const ProductDoc = await Product.create({
    Pname,
    description,
    price,
    images,
    category: category || undefined,
    properties: productProp,
  });
  return new Response(JSON.stringify(ProductDoc), { status: 201 });
};
export const PUT = async (req, res) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const { Pname, description, price, images, _id, category, productProp } =
      await req.json();
    const UpdatedProduct = await Product.findByIdAndUpdate(_id, {
      Pname,
      description,
      price,
      images,
      category: category || undefined,
      properties: productProp,
    });
    return new Response(JSON.stringify(UpdatedProduct), { status: 201 });
  } catch (err) {
    return new Response("Failed to update the product", { status: 500 });
  }
};
export const GET = async (req, res) => {
  try {
    await mongooseConnect();
    await isAdminRequest();
    const Allproducts = await Product.find();
    return new Response(JSON.stringify(Allproducts), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
