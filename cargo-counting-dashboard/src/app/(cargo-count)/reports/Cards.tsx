"use client"

import { Image } from "@chakra-ui/react";
import React from "react";
import { getFormatedTime } from "~/app/utils/timeFormatUtils";
import { type POResponseType } from "~/pages/api/api-typings";

const TransctionCard = ({data}:{data: POResponseType})=> {
  

    const handleGetParsedTime = (milSec:string,format?:string)=> {
        
      return getFormatedTime(milSec,format)

    }



    return <>
        <div className="flex overflow-hidden flex-row justify-between items-center bg-[var(--app-card-body)] px-[8px] h-max rounded-[8px]" style={{boxShadow:'1px 2px 6px 0px #1919193D'}}>
           <div className="w-max">
           <div className="w-[54px] h-[54px] overflow-hidden  bg-[var(--app-card-header)] rounded-full flex flex-col justify-center items-center">
              <Image className="w-[16px]" src="/images/cargo_icon.svg" alt="cargo_icon"/>
              <span className="text-[11px] text-left font-isb">    
                 {data?.count}
              </span>
           </div>
           </div>
           <div className="text-[11px] font-medium flex text-left justify-start w-[60%]  font-isb">{data?.poNumber}</div>
           <div className="flex flex-col pt-[2px] pb-[2px]">
              <div className="flex flex-col">
                 <span className="text-[11px] opacity-50  font-isb">Start Time</span>
                 <span className="text-[11px] font-bold  font-isb">{handleGetParsedTime(data?.startAt)}</span>
              </div>
              <div className="flex flex-col">
               <span className="text-[11px] opacity-50  font-isb">End Time</span>
                 <span className="text-[11px] font-bold  font-isb">{handleGetParsedTime(data?.endAt)}</span>
              </div>
           </div>
        </div>
    </>
}

export default React.memo(TransctionCard);