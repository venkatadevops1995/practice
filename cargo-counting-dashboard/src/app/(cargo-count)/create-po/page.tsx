/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client';

import { useEffect, useRef, useState } from 'react'
import { Box, Image } from '@chakra-ui/react'
import MenuBar from './Menubar'
import SlideTransition from '../../components/SlideTransition'
import CargoInputComponent from './CargoInputComponent'
import GenericCard from '~/app/components/GenericCard'
import useDeviceType from '~/app/hooks/useDeviceTypeHook'
import { useApplicationContext } from '~/app/context'
import { motion } from 'framer-motion'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useHttpClientHandler from '~/app/hooks/useHttpLoader'
import { defaultJob } from '../_RequestHandlers/live-request-handler'
import { AppEventEnum, type POResponseType } from '~/pages/api/api-typings'
import { getAllActiveJobs } from '../_RequestHandlers/create-po-request-handler'
import ActiveJobsList from '../shared/ActiveJobs'

const CreatePOPage = () => {
  const [isCardOpenForDesktopTablet, setCardOpenForDesktopTablet] = useState<
    boolean
  >(false)
  const { dispatch } = useApplicationContext()
  const { setLoader, setError } = useHttpClientHandler()

  const [animateValue, setAnimateValue] = useState<number>(200)

  const getDeviceType = useDeviceType()
  const [shouldIconVisible, setIconVisibility] = useState<boolean>(false)
  const [getActiveJobs,setActiveJobs] = useState<POResponseType[]>([])

  const toggleSlideRef = useRef<any>(null)

  // Fetch Default Job from Ray Pipeline
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getDefaultJob'],
    queryFn: defaultJob,
  })



  const {
    isPending: isPendingActiveJob,
    isError: isErrorActiveJob,
    data: dataActiveJob,
    error: errorActiveJob,
  } = useQuery({
    queryKey: ['fetchActiveJobs'],
    queryFn: getAllActiveJobs
  })

  useEffect(() => {
    if (isPendingActiveJob) {
      setLoader(true)
    }
    if (isErrorActiveJob || errorActiveJob) {
      setLoader(false)
      setError(error)
    }
  }, [isErrorActiveJob, errorActiveJob, isPendingActiveJob])

  useEffect(() => {
    if (dataActiveJob) {
      setActiveJobs(dataActiveJob?.data as POResponseType[]);
      setLoader(false)
    }
  }, [dataActiveJob])


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
  }, [data])
  
  
  
  useEffect(() => {
    if (getDeviceType) {
      setIconVisibility(true)
      setCardOpenForDesktopTablet(false)
    }
  }, [getDeviceType])




  const onHandleSlide = (action: unknown) => {
    if (getDeviceType !== 'mobile') {
      if (action === 'back') {
        setAnimateValue(200)
        setCardOpenForDesktopTablet(false)
        setIconVisibility(true)
      } else {
        setAnimateValue(0)
        setCardOpenForDesktopTablet(true)
        setIconVisibility(false)
      }
    } else {
      setIconVisibility(true)
      toggleSlideRef?.current?.onToggleSlide()
    }
  }

  return (
    <div className="grid h-full w-full relative overflow-x-hidden overflow-y-hidden grid-rows-[max-content,minmax(0,1fr)] pr-2">
      <div className="flex h-[50px] w-full items-center justify-start gap-x-[5px]">
        <MenuBar />
        <span className="h-max w-full desktop:text-[24px] mobile:text-[16px] tablet:text-[16px] font-isb font-[500]">Active Cargo List</span>
      </div>

      <div className="grid h-full w-full overflow-hidden tablet:grid-cols-1 desktop:grid-cols-1 mobile:grid-rows-[minmax(0,0.9fr)]">
        <div className="grid w-full pl-2">
          {getActiveJobs && <ActiveJobsList  data={getActiveJobs}/>}
          {!getActiveJobs && (
            <div>
              <Image
                src={'/images/create_job.svg'}
                alt="Landing Image"
                style={{ aspectRatio: '16 / 9', width: '90%', height: '90%' }}
              />

              <div className="font-inter font-[500] text-center">
                No, Active Cargo counting at the moment
              </div>
            </div>
          )}
        </div>
        <Box
          zIndex={99999999999}
          position={'absolute'}
          overflowX={'hidden'}
          height={'max-content'}
          as={motion.div}
          right={5}
          animate={{ x: animateValue }}
          transition="0.1s linear"
          initial={true}
        >
          {isCardOpenForDesktopTablet && (
            <div className="desktop:flex tablet:flex w-full justify-center mobile:hidden">
              <div className="desktop:w-[400px] tablet:w-[400px] desktop:h-max">
                <GenericCard title="New Cargo">
                  <CargoInputComponent close={onHandleSlide} />
                </GenericCard>
              </div>
            </div>
          )}
        </Box>
        {shouldIconVisible && (
          <div className="flex w-full justify-end absolute bottom-[35px] right-[31px]">
            <div
              onClick={() => onHandleSlide('forward')}
              className="relative h-[50px] w-[50px] bg-[var(--overlay-bg)] rounded-[12px]"
            >
              <Image
                className="absolute w-[31px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
                src="/images/cargo_icon.svg"
                alt="cargo"
              />
            </div>
          </div>
        )}
      </div>
      <SlideTransition ref={toggleSlideRef} direction="bottom">
        { getDeviceType!=='undefined' && getDeviceType === 'mobile' && (
          <CargoInputComponent title="New Cargo" close={onHandleSlide} />
        )}
      </SlideTransition>
    </div>
  )
}

export default CreatePOPage
