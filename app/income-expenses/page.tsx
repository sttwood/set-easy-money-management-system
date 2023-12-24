"use client"
import React, {useEffect, useState} from 'react'
import {Button, Select, Space} from 'antd'
import {BsClipboard2Data} from "react-icons/bs"
import {motion, useAnimation} from 'framer-motion'
import {useMenubarData} from '@/context/MenubarContext'
import dayjs from 'dayjs'
import {IncomeExpense} from '@/apis/types/financial'
import CardSection from './(components)/CardSection'

interface SelectOption {
    value: string
    label: string
}

const IncomeAndExpenese = () => {
    const controls = useAnimation()
    const {collapsed} = useMenubarData()
    const [selectDate, setSelectDate] = useState<string>('')
    const [filteredData, setFilteredData] = useState<IncomeExpense[]>([])
    const [uniqueOptions, setUniqueOptions] = useState<SelectOption[]>([])

    // Assign options
    useEffect(() => {
        // Extract unique options from the mockData
        const uniqueDatesSet = new Set<string>();

        const sortedData = mockData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        sortedData.forEach((item) => {
            const formattedDate = dayjs(item.createdAt).format('MM/YYYY');
            uniqueDatesSet.add(formattedDate);
        });

        // Convert set to array of objects with label and value properties
        const uniqueOptionsArray = Array.from(uniqueDatesSet).map((date) => ({
            label: date,
            value: date,
        }));

        // Update state with unique options
        setUniqueOptions(uniqueOptionsArray);
        if (!selectDate) {
            setFilteredData(mockData)
        }
    }, [])

    useEffect(() => {
        controls.start({paddingLeft: collapsed ? 164 : 0});
    }, [collapsed])

    const mockData = [
        {
            key: 1,
            createdAt: new Date('12-01-2023'),
            note: 'Salary',
            price: 20000,
            type: 'income',
            category: 'salary'
        },
        {
            key: 2,
            createdAt: new Date('12-01-2023'),
            note: 'Freelance',
            price: 4000,
            type: 'income',
            category: 'freelance'
        },
        {
            key: 3,
            createdAt: new Date('12-01-2023'),
            note: 'Food',
            price: 100,
            type: 'expense',
            category: 'food'
        },
        {
            key: 4,
            createdAt: new Date('12-02-2023'),
            note: 'Drinks & Beverages',
            price: 100,
            type: 'expense',
            category: 'beverages'
        },
        {
            key: 5,
            createdAt: new Date('12-03-2023'),
            note: 'Shopping',
            price: 100,
            type: 'expense',
            category: 'shopping'
        },
        {
            key: 6,
            createdAt: new Date('01-01-2024'),
            note: 'Entertainment',
            price: 100,
            type: 'expense',
            category: 'entertainment'
        }
    ]

    const filterIncomeData = mockData.filter((item) => {
        return item.type === 'income'
    })

    const filterExpenseData = mockData.filter((item) => {
        return item.type === 'expense'
    })

    return (
        <motion.div
            className='flex flex-col gap-6'
            animate={controls}
        >
            <div className='flex flex-row justify-between'>
                <h2 className='text-[24px] text-[#252525] font-semibold'>
                    Income - Expense Management
                </h2>
                <div className='flex flex-col gap-6 items-end'>
                    <Space size="large">
                        <Button className='bg-[#5388D8] hover:bg-[#4079cf] text-white border-0 px-5'>
                            <p className='hover:text-[#ebebeb] text-white ,-0'>+ New List</p>

                        </Button>
                        <Button className='p-[6px] hover:text-[#4096ff]'>
                            <BsClipboard2Data size={16} className='text-[#404040] hover:text-[#4096ff]' />
                        </Button>
                    </Space>
                    <Select
                        className='w-[180px] border-[#C8C8C8] text-[#252525] text-[12px]'
                        options={uniqueOptions}
                        placeholder='Select a Month/Year'
                        onChange={(value) => setSelectDate(value)}
                        allowClear
                    />
                </div>
            </div>
            <div className='flex flex-row justify-between gap-6 w-full'>
                <CardSection
                    title='Income'
                    data={filterIncomeData}
                />
                <CardSection
                    title='Expense'
                    data={filterExpenseData}
                />
            </div>
        </motion.div>
    )
}

export default IncomeAndExpenese