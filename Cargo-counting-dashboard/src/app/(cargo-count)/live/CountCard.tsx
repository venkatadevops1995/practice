import React, { useEffect, useState } from "react"
import DisplayTimeAgo from "~/app/components/DisplayTimeAgo";
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
          <span className="text-[var(--app-text-clr)] font-isb  text-[clamp(20px,1vw,22px)] font-semibold">
            {getLiveData?.poNumber ?? getLiveData?.po_number ?? '--'}
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

      <span className="inter opacity-65 absolute right-8 text-[14px]">
        <DisplayTimeAgo timestamp={getLiveData?.startAt}/>
      </span>
    </div>
  )
}

export default CountCard
