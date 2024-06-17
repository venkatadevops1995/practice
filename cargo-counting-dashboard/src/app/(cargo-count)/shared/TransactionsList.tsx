"use client";

import { type POResponseType } from "~/pages/api/api-typings";
import { useEffect, useState } from "react";
import NoRecordsFound from "~/app/components/NoRecods";
import useQueryParamsFilterHook from "~/app/hooks/useQueryParamsFilterHooks";
import React from "react";
import useDeviceType from "~/app/hooks/useDeviceTypeHook";
import TransctionCard from './Cards'

const TransactionList = ({ responseData, isActiveJobs }: { responseData: POResponseType[], isActiveJobs?: boolean }) => {

    const deviceType = useDeviceType()
    const [shouldListRendered, setShouldLayoutRendered] = useState<boolean>(false);


    const [poCounts, setPOCounts] = useState<POResponseType[]>([]);
    useQueryParamsFilterHook(responseData, 'poNumber', 'search', (data) => {
        setPOCounts(data as POResponseType[])
    })


    useEffect(() => {
        if(!isActiveJobs) {
          
            return 

        }

        if (responseData) {
            setPOCounts(responseData);
        }

    }, [responseData])




    useEffect(() => {
        if (deviceType !== 'undefined' && deviceType === 'mobile' || isActiveJobs) {
            setShouldLayoutRendered(true)
        }
    }, [deviceType])

    return (
        <>
            {shouldListRendered &&
              <div className="w-full grid">
                    <div className="grid gap-x-[16px]  gap-y-[16px] bg-[#F1F1F1]  2xl:grid-cols-5 desktop:grid-cols-4 tablet:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start  overflow-x-hidden" style={{gridTemplateColumns: !isActiveJobs  ? 'repeat(1,1fr)' : ''}}>
                    {poCounts?.length > 0 ? poCounts.map((co, i) => (
                        <TransctionCard isActiveJobs={isActiveJobs} key={i} data={co} />
                    )) : (

                        <NoRecordsFound>{isActiveJobs ?  'No Jobs Found!'   : 'No Records Found!'}</NoRecordsFound>
                    )}
                    </div>
                </div>
            }
            {
                !shouldListRendered && <NoRecordsFound>Loading...</NoRecordsFound>
            }
        </>

    );
};

export default TransactionList;
