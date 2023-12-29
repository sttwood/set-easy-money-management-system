"use client"
import {useMenubarData} from '@/context/MenubarContext';
import {motion, useAnimation} from 'framer-motion';
import React, {useEffect} from 'react'
import GraphSection from './GraphSection';
import SectionHeader from '@/components/SectionHeader';
import {Select} from 'antd';
import TableSection from './(components)/TableSection';

const Savings = () => {
    const controls = useAnimation()
    const {collapsed} = useMenubarData()

    const mockData = [
        {
            key: 1,
            createdAt: new Date ('2023-01-01'),
            deposit: 10000,
            present_value: 10000,
            interest: 275,
            total_value: 10275
        },
        {
            key: 2,
            createdAt: new Date ('2023-02-01'),
            deposit: 10000,
            present_value: 20275,
            interest: 557.56,
            total_value: 20832.56
        },
        {
            key: 3,
            createdAt: new Date ('2023-03-01'),
            deposit: 10000,
            present_value: 30832.56,
            interest: 847.86,
            total_value: 31680.42
        },
        {
            key: 4,
            createdAt: new Date ('2023-04-01'),
            deposit: 10000,
            present_value: 41680.42,
            interest: 1127.06,
            total_value: 42707.48
        },
        {
            key: 5,
            createdAt: new Date ('2023-05-01'),
            deposit: 10000,
            present_value: 42707.48,
            interest: 1376.26,
            total_value: 43973.74
        },
        {
            key: 6,
            createdAt: new Date ('2023-06-01'),
            deposit: 10000,
            present_value: 43973.74,
            interest: 1625.46,
            total_value: 45699.2
        },
        {
            key: 7,
            createdAt: new Date ('2023-07-01'),
            deposit: 10000,
            present_value: 45699.2,
            interest: 1874.66,
            total_value: 47673.86
        },
        {
            key: 8,
            createdAt: new Date ('2023-08-01'),
            deposit: 10000,
            present_value: 47673.86,
            interest: 2123.86,
            total_value: 49997.72
        },
        {
            key: 9,
            createdAt: new Date ('2023-09-01'),
            deposit: 10000,
            present_value: 49997.72,
            interest: 2373.06,
            total_value: 52570.78
        },
        {
            key: 10,
            createdAt: new Date ('2023-10-01'),
            deposit: 10000,
            present_value: 52570.78,
            interest: 2622.26,
            total_value: 55293.04
        },
        {
            key: 11,
            createdAt: new Date ('2023-11-01'),
            deposit: 10000,
            present_value: 55293.04,
            interest: 2871.46,
            total_value: 58274.5
        },
        {
            key: 12,
            createdAt: new Date ('2023-12-01'),
            deposit: 10000,
            present_value: 58274.5,
            interest: 3120.66,
            total_value: 61494.16
        }
    ]
    const interestRate = 2.75

    useEffect(() => {
        controls.start({paddingLeft: collapsed ? 164 : 0});
    }, [collapsed])

    return (
        <motion.div
            className='flex flex-col gap-6'
            animate={controls}
        >
            <div className='flex flex-row justify-between w-full pr-12'>
                <SectionHeader label='Savings' textStyle='text-[24px]' />
                <Select
                    defaultValue="2023"
                    style={{width: 120}}
                    options={[
                        {value: '2023', label: '2023'},
                        {value: '2024', label: '2024'},
                        {value: '2025', label: '2024'},
                        {value: '2026', label: '2024'},
                    ]}
                />
            </div>
            <GraphSection />
            <TableSection 
                data={mockData}
                interestRate={interestRate}
            />
        </motion.div>
    )
}

export default Savings