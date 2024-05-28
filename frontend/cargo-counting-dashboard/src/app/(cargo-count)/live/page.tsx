"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Image } from "@chakra-ui/react";
import CountCard from "./CountCard";
import { type POResponseType, type WebsocketEventEnum } from "~/pages/api/api-typings";
import React from "react";
import AlertDialogBox from "../../components/Alerts";
import { useRouter } from "next/navigation";
import useCheckCargoLiveFromClient from "../cargo-utils/cargo-live-client";
import { useApplicationContext } from "~/app/context";

const CargoLivePage =  () => {  
  void useCheckCargoLiveFromClient()
  const  {state} = useApplicationContext()
  const [getCargoEvent,setCargoEvent] = useState<POResponseType>();
  const alertRef = useRef<any>(null);
  const route = useRouter();
  const onAskUserConfirmation = ()=> {
       alertRef?.current?.onOpen()
  }
 
 
  const onHandleClose = async ()=> {
     
       alertRef?.current?.onClose();
  }

   const onHandleConfirm = ()=> {
       route.push('/create-po');   
  }

  useEffect(()=> {
     setCargoEvent(state.liveCountData)
  }, [state.liveCountData])


  return (
    <div className="grid w-full  overflow-hidden grid-rows-[max-content,minmax(0,1fr)]">
      <div className="flex h-[50px] w-full gap-x-2 items-center justify-start">
        <Image src="/images/live_icon.svg"  alt="live"/> <span> Cargo Live</span>
      </div>
      <div className="grid h-full w-full gap-y-[20px]  grid-rows-[max-content,1fr,max-content]]">
        <div className="h-max  mobile:justify-center w-full flex text-[24px] font-[500]">
          <CountCard  liveData={getCargoEvent}/>
        </div>
        <div className="grid w-full h-full justify-center items-center">
            <Image aspectRatio={16 / 9} objectFit={'cover'} width={'100%'} height={'100%'} src={'/images/cargo_live_img.svg'} alt="cargo live image" />
        </div>
        <div className="grid w-full h-full items-end  justify-center">
            <Button
            onClick={onAskUserConfirmation}
            type="submit"
            width={'280px'}
            alignSelf={'center'}
            height={'54px'}
            borderRadius={'50px'}
            bg={'var(--app-btn-cancel)'}
            className={`${true ? '' : 'no-ptr'}`}
          >
            Stop
          </Button>
        </div>
      </div>

      <AlertDialogBox ref={alertRef} title="Confirmation Message" message="Do you want to Stop the Counting ?">


       
       <div className="flex gap-x-[30px]">
         <Button
            onClick={onHandleClose}
            type="submit"
            alignSelf={'center'}
            height={'40px'}
            borderRadius={'4px'}
            bg={'var(--app-btn-close)'}
            className={`${true ? '' : 'no-ptr'}`}
          >
           Cancel
          </Button>

           <Button
            onClick={onHandleConfirm}
            type="submit"
            alignSelf={'center'}
            height={'40px'}
            borderRadius={'4px'}
            bg={'var(--app-btn-bg)'}
            className={`${true ? '' : 'no-ptr'}`}
          >
            Confirm
          </Button>
       </div>
      </AlertDialogBox>
    </div>
  );
};

export default React.memo(CargoLivePage);
function dispatch(arg0: { type: WebsocketEventEnum; paylaod: null; }) {
  throw new Error("Function not implemented.");
}

