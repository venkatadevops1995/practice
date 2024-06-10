import { PrismaClient } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";
import { type POResponseType } from "~/pages/api/api-typings";
const prisma = new PrismaClient();

const useCheckCargoLiveFromServer = async ()=> {

   try {
  
        const getPoCount = await prisma?.cargoCount?.findMany({
        where: {
            isActive: true
        }
    }) as unknown as POResponseType;
    
      
      if (getPoCount?.isActive) {
         redirect('/live', RedirectType.push)
      } else {
         redirect('/create-po', RedirectType.push)
      }
   }catch(e) {
        console.log("somethins is wrong",e)
         redirect('/create-po', RedirectType.push)
   }

   }


export default useCheckCargoLiveFromServer;
