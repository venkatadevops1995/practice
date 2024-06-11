import {  } from 'react'
import { useApplicationContext } from '../context'
import { AppEventEnum } from '~/pages/api/api-typings'

const useHttpLoader =()=> {
  const { dispatch } = useApplicationContext()

  const setLoader = 
    (state: boolean, text?: string) => {
      dispatch({ type: AppEventEnum.LOADER, payload: { state, text } })
    }
    

  return { setLoader }
}

export default  useHttpLoader
