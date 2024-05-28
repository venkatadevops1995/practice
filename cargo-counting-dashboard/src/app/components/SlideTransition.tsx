"use client";
import { useDisclosure, Slide, Box } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle } from 'react';

export interface  SlideCallBacks extends React.HTMLAttributes<HTMLElement | null>  {

    direction?: "bottom" | 'left' | "top" | "right"
    children?: React.ReactNode
    onToggleSlide?: ()=>void
}

export default forwardRef(function SlideTransition(props: 
   SlideCallBacks
,ref) {
  const { isOpen, onToggle } = useDisclosure();

 
   useImperativeHandle(ref, () => {
    return {
      onToggleSlide() {
        onToggle()
      },
     
    };
  }, [onToggle]);



  return (
    <Slide direction={props?.direction} in={isOpen} style={{ zIndex: 10 }}>
      <Box
        color="white"
        mt="4"
        rounded="md"
        shadow="md"
      >
        {props?.children}
      </Box>
    </Slide>
  );
})


