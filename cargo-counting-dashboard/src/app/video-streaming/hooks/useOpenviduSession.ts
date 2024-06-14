/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from 'axios'
import useOpenViduState from './useSessionStore'
import { type OpenViduServerConnectionConfig } from '../typings/openvidu-typings'

const useSessionServices = () => {

  const getOpenViduSession = '/rail/openvidu_session';
  const SessionEndPoint = 'openvidu/api/sessions/';

  const {
    tokenCollection,
    setTokenCollection,
    setTokenCollectionMain,
    setOpenViduServerConnectionConfig,
    setTokenCollectionForPinnedStream,
    openViduServerConnectionConfig
  } = useOpenViduState()

  const getAllInitialApiCall = async (RealTypeModuleName?: string) => {
    try {
      const connection = await getSessionConnectionConfiguration(RealTypeModuleName)
      setOpenViduServerConnectionConfig(connection)
      await getAllTokensForSession()
      setTokenCollection(tokenCollection)
    } catch (error) {
      console.error('Session Not Fetched or Connection Failed!')
    }
  }

  const restartApiCall = async () => {
    try {
      const connection = await getRestartSessionConnectionConfiguration()
      setOpenViduServerConnectionConfig(connection)
      await getAllTokensForSession()
      setTokenCollection(tokenCollection)
    } catch (error) {
      console.error('Session Not Fetched or Connection Failed!')
    }
  }

  const getRestartSessionConnectionConfiguration = async (): Promise<OpenViduServerConnectionConfig> => {
    try {
      const response = await axios.post('/restart_services')
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      throw new Error('Failed to restart session configuration')
    }
  }

  const getSessionConnectionConfiguration = async (
    moduleName?: string,
  ): Promise<OpenViduServerConnectionConfig> => {
    try {
      const payload = {
        module_name: moduleName,
      }
      if (!moduleName) {
        throw new Error('Module name is empty')
      }
      const response = await axios.post(getOpenViduSession, payload)
      if (response.status === 200) {
        return JSON.parse(response.data)
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      throw new Error('Failed to get session connection configuration')
    }
  }

  const getAllTokensForSession = async (): Promise<void> => {
    try {
      const options = {
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:${openViduServerConnectionConfig?.openvidu_secret}`)}`,
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${openViduServerConnectionConfig?.openvidu_url}/${SessionEndPoint}/${openViduServerConnectionConfig?.session_id}/connection`,
        {},
        options,
      )
      setTokenCollection([response.data])
    } catch (error) {
      throw new Error('Failed to get tokens for session')
    }
  }

  const getTokensForMainStream = async () => {
    try {
      await getAllTokensForSession()
      setTokenCollectionMain(tokenCollection)
    } catch (error) {
      console.log('Connection Failed!')
    }
  }

  const getTokenForPinnedStream = async () => {
    try {
      await getAllTokensForSession()
      setTokenCollectionForPinnedStream(tokenCollection)
    } catch (error) {
      console.log('Connection Failed!')
    }
  }

  return {
    getAllInitialApiCall,
    restartApiCall,
    getTokensForMainStream,
    getTokenForPinnedStream,
  }
}

export default useSessionServices
