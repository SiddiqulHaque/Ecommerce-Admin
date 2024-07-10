import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const adminEmails=['siddiqamu786@gmail.com','siddiqjmi786@gmail.com']
export const authOptions={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  adapter:MongoDBAdapter(clientPromise),
  callbacks:{
    jwt:({session,token,user})=>{
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }
      else{
        return false;
      }
    }
  }
}
export const isAdminRequest=async()=>{
  const session=await getServerSession(authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    throw "Not Admin request"
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }