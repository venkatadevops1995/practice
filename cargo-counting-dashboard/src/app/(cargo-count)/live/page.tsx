/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Image } from "@chakra-ui/react";
import CountCard from "./CountCard";
import { WebsocketEventEnum, type PORequestType, type POResponseType } from "~/pages/api/api-typings";
import React from "react";
import AlertDialogBox from "../../components/Alerts";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "~/app/context";
import { stopJobHandler } from "../_RequestHandlers/live-request-handler";
import { startStopCountRequestHandler } from "../_RequestHandlers/create-po-request-handler";
import axios from "axios";

const CargoLivePage =  () => {  
  const  {state,dispatch} = useApplicationContext()
  const [getCargoEvent,setCargoEvent] = useState<POResponseType>();
  const alertRef = useRef<any>(null);
  const [isJobCanceled,setJobCanceled] = useState<boolean>(false);
  const route = useRouter();
  const onAskUserConfirmation = ()=> {
       alertRef?.current?.onOpen()
  }
 
 
  const onHandleClose = async ()=> {
     
       alertRef?.current?.onClose();
  }
/**
 *? After confirmation user can stop job but need to wait from ray piple response untill count will be displayed
 *! TODO: Need to check should i wait to ray response or just direct move to again create new job
 */
const onHandleConfirm = async ()=> {  
  //! A method has implememted to communicate with the ray pipline to stop job/start
  startStopCountRequestHandler(getCargoEvent?.po_number ?? getCargoEvent?.poNumber ?? '' , 'stop', state?.runtime_env)?.then(async (startResponse)=> {
    const  startPayload: PORequestType = {
      startAt: new Date().getTime()+'',
      endAt: new Date().getTime()+'',
      isActive: false,
      po_number:  getCargoEvent?.po_number ?? getCargoEvent?.poNumber ?? '',
      count: 0
    }
   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
   if([200,201]?.includes(startResponse?.status)) {
       alertRef?.current?.onClose();
       setJobCanceled(true);
       const response =    await stopJobHandler(startPayload)
       if([200,201].includes(response.status)) {
         //! Update the Context Store
         //! After Navigate to the Create new Job
         //* wait for some mocked time like , ray will finished 
         setJobCanceled(false); 
         dispatch({type: WebsocketEventEnum.LIVE_COUNT, payload: startPayload as any})
         route.push('/create-po')
        } 
   }
  })?.catch(err=> {
     console.log("error",err)
  })
   }

  useEffect(()=> {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
     setCargoEvent(state?.liveCountData ?? undefined)
  }, [state, state?.liveCountData])

  useEffect(() => {
    const defaultJob = async ()=> {
      const response = await  axios.get('/api/fetch-default-job');
      const result = (await response?.data)
      dispatch({type: WebsocketEventEnum.RUN_TIME_ENV, payload: result?.runtime_env})
       return
    }
    defaultJob()
   
  }, [])



  return (
    <div className="grid w-full  overflow-auto grid-rows-[max-content,minmax(0,1fr)]">
      <div className="flex h-[50px] w-full gap-x-2 items-center justify-start">
        <Image src="/images/live_icon.svg"  alt="live"/> <span> Cargo Live</span>
      </div>
      <div className="grid h-full w-full gap-y-[20px]  grid-rows-[max-content,1fr,max-content]]">
        <div className="h-max relative mobile:justify-center w-full flex text-[24px] font-[500]">
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
            _hover={{background: 'var(--app-btn-cancel)'}}

            className={`${!isJobCanceled ? '' : 'no-ptr'}`}
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


