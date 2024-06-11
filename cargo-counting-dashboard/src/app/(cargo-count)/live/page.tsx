/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Image } from "@chakra-ui/react";
import CountCard from "./CountCard";
import { AppEventEnum, type PORequestType, type POResponseType } from "~/pages/api/api-typings";
import React from "react";
import AlertDialogBox from "../../components/Alerts";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "~/app/context";
import { defaultJob, stopJobHandler } from "../_RequestHandlers/live-request-handler";
import { startStopCountRequestHandler } from "../_RequestHandlers/create-po-request-handler";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";

const CargoLivePage =  () => {  
  const  {state,dispatch} = useApplicationContext()
    const {setLoader, setError} = useHttpClientHandler()
  const [getCargoEvent,setCargoEvent] = useState<POResponseType>();
  const alertRef = useRef<any>(null);
  const [isJobCanceled,setJobCanceled] = useState<boolean>(false);
  const route = useRouter();
  const onAskUserConfirmation = ()=> {
       alertRef?.current?.onOpen()
  }
 

 
  const requestJobMutation = useMutation({
  mutationFn: () => startStopCountRequestHandler(getCargoEvent?.po_number ?? getCargoEvent?.poNumber ?? '', 'stop', state?.runtime_env),
  onSuccess: (startResponse) => {
    setLoader(true);
    if ([200, 201].includes(startResponse.status)) {
      const startPayload: PORequestType = {
        startAt: '',
        endAt: new Date().getTime() + '',
        isActive: false,
        po_number: getCargoEvent?.po_number ?? getCargoEvent?.poNumber + '',
        count: 0
      }
      setJobCanceled(true);
      alertRef?.current?.onClose();
      dispatch({type: AppEventEnum.LIVE_COUNT, payload: startPayload})
      stopJobMutation.mutate(startPayload)
    }
  },
  onError: (err) => {
    setLoader(false);
    alertRef?.current?.onClose();
    setError(err)
    console.log("error", err)
  }
})

const stopJobMutation = useMutation({
  mutationFn: (startPayload: PORequestType) => stopJobHandler(startPayload),
  onSuccess: (saveResponse) => {
    if ([200, 201].includes(saveResponse.status)) {
      setLoader(false);
      route.push('/create-po')
    }
  },
  onError: (err) => {
    setLoader(false);
    setError(err)
    alertRef?.current?.onClose();
    console.log("error", err)
  }
})
  const onHandleClose = async ()=> {
     
       alertRef?.current?.onClose();
  }

  const onHandleConfirm = async ()=> {  
  requestJobMutation.mutate();

  }
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getDefaultJob'],
    queryFn: defaultJob,
  })
  useEffect(() => {
    if (isPending) {
      setLoader(true)
    }
    if (isError || error) {
      setLoader(false)
      setError(error)
    }
  }, [isPending, isError, error, dispatch])

  useEffect(() => {
    if (data) {
       dispatch({
      type: AppEventEnum.RUN_TIME_ENV,
      payload: data.data?.runtime_env,
    })
      setLoader(false)
    }
  }, [data, dispatch])





  useEffect(()=> {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
     setCargoEvent(state?.liveCountData ?? undefined)
  }, [state, state?.liveCountData])

 

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
export default React.memo(CargoLivePage)