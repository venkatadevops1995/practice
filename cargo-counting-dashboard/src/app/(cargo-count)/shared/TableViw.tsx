/* eslint-disable react/jsx-key */
"use client"

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import React from 'react';
import { useState } from 'react';
import NoRecordsFound from '~/app/components/NoRecods';
import useDeviceType from '~/app/hooks/useDeviceTypeHook';
import useQueryParamsFilterHook from '~/app/hooks/useQueryParamsFilterHooks';
import { getFormatedTime } from '~/app/utils/timeFormatUtils';
import { type POResponseType } from '~/pages/api/api-typings';

const TableView =   ({ responseData , isActivePage = false }: { responseData: POResponseType[] , isActivePage:boolean }) => {
    const diviceType = useDeviceType()
    const [getFilteredData,setFilteredData] = useState<POResponseType[]>([]);
     useQueryParamsFilterHook(responseData, 'poNumber','search',(data)=> {       
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFilteredData(data);
    })
    const handleGetParsedTime = (milSec:string,format:string)=> {
        
      return getFormatedTime(milSec,format)

    }  
    return (
        <>
          {
   diviceType !=='mobile' && getFilteredData.length > 0  ?          
    <div
     className='grid]'
  >
    <TableContainer>
      <Table boxShadow={'0px 2px 12px 2px #CAC9C966'} height={'calc(100vh - 54px)'} display={'grid'} gridTemplateRows={'max-content minmax(0,1fr)'}>
        <Thead style={{borderBottom: '0.001rem solid #C1C1C1' ,outline: 'none'}}>
          <Tr 
>
            <Th position={'sticky'}>Start Time</Th>
            <Th>End Time</Th>
            <Th>PO Number</Th>
            <Th>Cargo Count</Th>
          </Tr>
        </Thead>
        <Tbody className='overflow-auto h-full w-full pb-[10px]'>
         {
            getFilteredData?.map(data=> {
                return (          
                    <Tr>
                        <Td  className='flex flex-col'>
                          <span className='font-isb'>
                          {handleGetParsedTime(data?.startAt,'DD-MMM-YYYY')  ?? '__'}

                          </span>
                          <span>
                          {handleGetParsedTime(data?.startAt,'HH:mm')}

                          </span>
                        </Td>
                        <Td className='flex flex-col text-center'>
                          <span className='font-isb'>
                          {handleGetParsedTime(data?.endAt,'DD-MMM-YYYY') ?? '__'}

                          </span>
                         <span>
                          {handleGetParsedTime(data?.endAt,'HH:mm')}

                         </span>
                          
                          </Td>
                        <Td className='font-isb'>{data?.poNumber}</Td>
                        <Td className='font-isb'>{data?.count}</Td>
                    </Tr>
                )
            })
         }
        </Tbody>
      </Table>
    </TableContainer>

    </div>
      : ( diviceType !=='mobile' && <NoRecordsFound>No Record Found!</NoRecordsFound> )  } 
        </>
  )
}

export default TableView
