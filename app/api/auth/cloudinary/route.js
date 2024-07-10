import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { isAdminRequest } from "../[...nextauth]/route";

export const revalidate = 1;
export async function POST(req) {
  const body = await req.json();
  const { paramsToSign } = body;

  try {
    await isAdminRequest();
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    );
    return NextResponse.json(
      {
        signature,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}
