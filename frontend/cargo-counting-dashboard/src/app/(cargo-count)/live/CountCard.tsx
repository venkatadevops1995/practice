import React, { useEffect, useState } from "react"
import { type POResponseType } from "~/pages/api/api-typings"

const CountCard = ({liveData}:{liveData:POResponseType | undefined}) => {

  const [getLiveData,setLiveData] = useState<POResponseType>();


  useEffect(()=> {

    setLiveData(liveData);

  },[liveData])
   

  return (
    <div className="w-full h-full overflow-hidden rounded-[6px]">
      <div className="w-full h-[54px] bg-[var(--app-card-header)]">
        <div className="flex flex-col px-[20px]  pb-[5px]">
          <span className="text-[var(--app-text-clr)] font-isb opacity-[0.6] text-[clamp(12px,0.5vw,14px)]">
            Purchage Order Number
          </span>
          <span className="text-[var(--app-text-clr)] font-isb  text-[clamp(18px,1vw,20px)] font-semibold">
            {getLiveData?.poNumber ?? '--'}
          </span>
        </div>
      </div>
      <div className="px-[20px] grid items-center pb-[5px] w-full min-h-[120px] h-full bg-[var(--app-card-body)]">
        <div className="flex  flex-col">
          <span className="text-[var(--app-text-clr)] font-isb opacity-[0.6] text-[clamp(20px,0.5vw,25px)]">
            TOTAL CARGO COUNT
          </span>
          <span className="text-[var(--app-text-clr)] font-isb text-[clamp(20px,0.5vw,25px)] font-semibold">
            {getLiveData?.count ?? '--'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CountCard
