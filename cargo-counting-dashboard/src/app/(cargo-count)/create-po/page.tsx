/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import { Image } from '@chakra-ui/react'
import MenuBar from './Menubar'
import SlideTransition from '../../components/SlideTransition'
import CargoInputComponent from './CargoInputComponent'
import GenericCard from '~/app/components/GenericCard'
import useDeviceType from '~/app/hooks/useDeviceTypeHook'
import { useRouter } from 'next/navigation'
import { useApplicationContext } from '~/app/context'
import useCheckCargoLiveFromClient from '../cargo-utils/cargo-live-client'

const CreatePOPage =  () => {
   
  // eslint-disable-next-line react-hooks/rules-of-hooks
  void useCheckCargoLiveFromClient()

  const [isCardOpenForDesktopTablet, setCardOpenForDesktopTablet] = useState<
    boolean
  >(false)
  const  {state,dispatch} = useApplicationContext()

  const getDeviceType = useDeviceType()
  const [shouldIconVisible, setIconVisibility] = useState<boolean>(false)

  const toggleSlideRef = useRef<any>(null)
  const router = useRouter();

  const onHandleSlide = (action: unknown) => {
    if (getDeviceType !== 'mobile') {
      if (action === 'back') {
        setCardOpenForDesktopTablet(false)
        setIconVisibility(true)
      } else {
        setCardOpenForDesktopTablet(true)
        setIconVisibility(false)
      }
    } else {
      setIconVisibility(true)
      toggleSlideRef?.current?.onToggleSlide()
    }
  }

  useEffect(() => {
    if(getDeviceType !== "undefined") {
      setIconVisibility(true)
      setCardOpenForDesktopTablet(false)
    }
  }, [getDeviceType])


   useEffect(()=> {
      if((state?.liveCountData)?.isActive) {
       router.push('/live');
      }
  }, [router, state?.liveCountData])

  return (
    <div className="grid h-full w-full overflow-auto grid-rows-[max-content,minmax(0,1fr)] pr-2">
      <div className="flex h-[50px] w-full items-center justify-start gap-x-[5px]">
        <MenuBar />
        <span className="h-max w-full text-[24px] font-isb font-[500]">
          
        </span>
      </div>

      <div className="grid h-full w-full tablet:grid-cols-2 desktop:grid-cols-2 relative  mobile:grid-rows-[minmax(0,0.9fr),max-content]">
        <div className="grid w-full justify-center items-center pl-2">
          <Image
            src={'/images/landing_img.svg'}
            alt="Landing Image"
            style={{ aspectRatio: '16 / 9', width: '90%', height: '90%' }}
          />
        </div>
        {isCardOpenForDesktopTablet && (
          <div className="desktop:flex tablet:flex w-full justify-center mobile:hidden">
            <div className="desktop:w-[400px] tablet:w-[400px] desktop:h-max">
              <GenericCard title="New Cargo">
                <CargoInputComponent
                  close={onHandleSlide}
                ></CargoInputComponent>
              </GenericCard>
            </div>
          </div>
        )}
        {shouldIconVisible && (
          <div className="flex w-full justify-end absolute bottom-[35px] right-[31px]">
            <div   onClick={onHandleSlide} className="relative h-[50px] w-[50px] bg-[var(--overlay-bg)] rounded-[12px]">
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
        {getDeviceType ==='mobile' && (
          <CargoInputComponent
            title="New Cargo"
            close={onHandleSlide}
          ></CargoInputComponent>
        )}
      </SlideTransition>
    </div>
  )
}

export default CreatePOPage
