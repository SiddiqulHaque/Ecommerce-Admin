import { Orders } from "@Models/orders";
import { mongooseConnect } from "@lib/mongoose";

export const GET = async (req, res) => {
  try {
    await mongooseConnect();
    const orders = await Orders.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 201 });
  } catch (error) {
    return new Response("Failed to get orders", { status: 500 });
  }
};
// export const DELETE=async(req,res)=>{
//     try {
//         await mongooseConnect();
//         await Orders.deleteMany();
//         return new Response("deleted",{status:201});
//     } catch (error) {
        
//     }
// }
