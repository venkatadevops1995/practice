"use client"

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import DisplayTimeAgo from "~/app/components/DisplayTimeAgo";
import { useApplicationContext } from "~/app/context";
import { getFormatedTime } from "~/app/utils/timeFormatUtils";
import { AppEventEnum, type POResponseType } from "~/pages/api/api-typings";

const TransctionCard = ({ data, isActiveJobs }: { data: POResponseType, isActiveJobs?: boolean }) => {

   const router = useRouter();
   const { dispatch } = useApplicationContext();


   const handleGetParsedTime = (milSec: string, format?: string) => {

      return getFormatedTime(milSec, format)

   }

   const navigateTolivePage = () => {
      if (!isActiveJobs) {
         return
      }

      if (data) {
         dispatch({ type: AppEventEnum.SELCTED_LIVE_DATA, payload: data })
      }

      router?.push(`/live/?active=${data.poNumber ?? data?.po_number}`)

   }



   return <>
      <div suppressHydrationWarning onClick={navigateTolivePage} className="flex overflow-hidden cursor-pointer desktop:w-[320px] mobile:w-full tablet:w-[300px] flex-row justify-between items-center bg-[var(--app-card-body)] px-[8px] h-[70px] rounded-[8px]" style={{ boxShadow: '1px 2px 6px 0px #1919193D' }}>
         <div className="w-max">
            <div style={{ background: isActiveJobs ? '#F4B2B2' : 'var(--app-card-header)' }} className="w-[54px] h-[54px] overflow-hidden  rounded-full flex flex-col justify-center items-center">
               <Image className="w-[16px]" src="/images/cargo_icon.svg" alt="cargo_icon" />
               {
                  !isActiveJobs && <span className="text-[11px] text-left font-isb">
                     {data?.count}
                  </span>
               }

            </div>
         </div>

         <div className="flex flex-col  w-full ml-2">
            <div className="text-[11px] font-medium flex text-left justify-start w-[60%]  ml-[5px] font-isb">{data?.poNumber}</div>
            {
               isActiveJobs &&
               <div className="flex justify-start ml-[5px]">
                  <span className="text-[11px] font-medium font-isb"> <DisplayTimeAgo timestamp={data?.startAt} /> </span>

               </div>
            }
         </div>


         {
            !isActiveJobs &&
            <div className="flex flex-col pt-[2px] pb-[2px]">
               <div className="flex flex-col">
                  <span className="text-[11px] opacity-50  font-isb">Start Time</span>
                  <span className="text-[11px] block font-bold  w-max font-isb">{handleGetParsedTime(data?.startAt) ?? '__'}</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[11px] opacity-50  font-isb">End Time</span>
                  <span className="text-[11px] block font-bold w-max font-isb">{handleGetParsedTime(data?.endAt) ?? '__'}</span>
               </div>
            </div>
         }

         {
            isActiveJobs && <div className="desktop:hidden tablet:hidden mobile:block"><ChevronRightIcon boxSize={'20px'} /></div> 
         }
      </div>
   </>
}

export default TransctionCard;