import { PrismaClient } from "@prisma/client";
import { redirect, RedirectType } from "next/navigation";
import { type POResponseType } from "~/pages/api/api-typings";
const prisma = new PrismaClient();

const useCheckCargoLiveFromServer = async ()=> {
  
        const getPoCount = await prisma.poCounts.findFirst({
        where: {
            isActive: true
        }
    }) as unknown as POResponseType;
    
      
      if (getPoCount?.isActive) {
         redirect('/live', RedirectType.push)
      } else {
         redirect('/create-po', RedirectType.push)
      }
}


export default useCheckCargoLiveFromServer;
