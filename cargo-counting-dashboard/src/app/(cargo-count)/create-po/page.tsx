/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client'

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
import { AppEventEnum } from '~/pages/api/api-typings'

const CreatePOPage = () => {
  const [isCardOpenForDesktopTablet, setCardOpenForDesktopTablet] = useState<
    boolean
  >(false)
  const { dispatch } = useApplicationContext()
  const { setLoader , setError } = useHttpClientHandler()

  const [animateValue, setAnimateValue] = useState<number>(200)

  const getDeviceType = useDeviceType()
  const [shouldIconVisible, setIconVisibility] = useState<boolean>(false)

  const toggleSlideRef = useRef<any>(null)
  
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
    <div className="grid h-full w-full overflow-x-hidden overflow-y-auto grid-rows-[max-content,minmax(0,1fr)] pr-2">
      <div className="flex h-[50px] w-full items-center justify-start gap-x-[5px]">
        <MenuBar />
        <span className="h-max w-full text-[24px] font-isb font-[500]"></span>
      </div>

      <div className="grid h-full w-full tablet:grid-cols-2 desktop:grid-cols-2 relative mobile:grid-rows-[minmax(0,0.9fr),max-content]">
        <div className="grid w-full pl-2">
          <Image
            src={'/images/landing_img.svg'}
            alt="Landing Image"
            style={{ aspectRatio: '16 / 9', width: '90%', height: '90%' }}
          />
        </div>
        <Box
          overflowX={'hidden'}
          as={motion.div}
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
        {getDeviceType === 'mobile' && (
          <CargoInputComponent title="New Cargo" close={onHandleSlide} />
        )}
      </SlideTransition>
    </div>
  )
}

export default CreatePOPage
