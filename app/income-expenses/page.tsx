"use client"
import {useMenubarData} from '@/context/MenubarContext';
import {motion, useAnimation} from 'framer-motion';
import React, {useEffect} from 'react'

const IncomeAndExpenese = () => {
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
            IncomeAndExpenese
        </motion.div>
    )
}

export default IncomeAndExpenese