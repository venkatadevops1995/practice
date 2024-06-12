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

        if (responseData) {
            setPOCounts(responseData);
        }

    }, [responseData])




    useEffect(() => {
        if (deviceType !== 'undefined' && deviceType === 'mobile') {
            setShouldLayoutRendered(true)
        }
    }, [deviceType])

    return (
        <>
            {shouldListRendered &&
                <div className="grid  gap-y-[16px] bg-[#F1F1F1]   overflow-x-hidden w-full">
                    {poCounts?.length > 0 ? poCounts.map((co, i) => (
                        <TransctionCard isActiveJobs={isActiveJobs} key={i} data={co} />
                    )) : (

                        <NoRecordsFound>No Record Found!</NoRecordsFound>
                    )}
                </div>
            }
            {
                !shouldListRendered && <NoRecordsFound>Loading...</NoRecordsFound>
            }
        </>

    );
};

export default TransactionList;
