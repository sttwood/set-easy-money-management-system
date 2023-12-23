"use client"
import React, {useEffect, useState} from 'react'

import {
    TotalSection,
    GraphSection,
    IncomeExpenseTabele,
    SavingsTable
} from './(components)'
import {useMenubarData} from '@/context/MenubarContext';
import {motion, useAnimation} from 'framer-motion';
import useWindowSize from '@/hooks/screenSize';

const Dashboard = () => {
    let size = useWindowSize()
    const controls = useAnimation();
    const {collapsed} = useMenubarData();

    useEffect(() => {
        controls.start({paddingLeft: collapsed ? 164 : 0});
    }, [collapsed])

    return (
        <motion.div
            className='flex flex-col gap-6'
            animate={controls}
        >
            <h2 className='text-[24px] text-[#252525] font-semibold'>
                December, 2023
            </h2>
            <TotalSection />
            <GraphSection screenSize={size} />
            <div className='flex flex-row justify-between gap-6'>
                <IncomeExpenseTabele />
                <SavingsTable />
            </div>
        </motion.div>
    )
}

export default Dashboard