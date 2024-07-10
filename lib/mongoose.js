// import mongoose from "mongoose";

// export function mongooseConnect() {
//   if (mongoose.connection.readyState === 1) {
//     return mongoose.connection.asPromise();
//   } else {
//     const uri = process.env.MONGODB_URI;
//     return mongoose.connect(uri);
//   }
// }
import mongoose from "mongoose";
let isConnected=false;
export const mongooseConnect=async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("Mongoose is already Connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log("MongoDb Connected");
    } catch (error) {
        console.log(error);
    }
}
