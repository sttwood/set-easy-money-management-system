import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'

import {Button, Divider, Input, Select, Table, Tag} from 'antd'
import {ColumnsType} from 'antd/es/table'
import {TbFileExport, TbFileTypeXls, TbFileTypePdf} from "react-icons/tb"
import {HiMiniMagnifyingGlass} from "react-icons/hi2"

import {IncomeExpense} from '@/apis/types/financial'
import SectionHeader from '@/components/SectionHeader'

interface SelectOption {
    value: string
    label: string
}

const IncomeExpenseTabele = () => {
    const [uniqueOptions, setUniqueOptions] = useState<SelectOption[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState()

    // Filter
    const [selectDate, setSelectDate] = useState<string>('')
    const [searchData, setSearchData] = useState<string>('')
    const [filteredData, setFilteredData] = useState<IncomeExpense[]>([])

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

    const columns: ColumnsType<any> = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            defaultSortOrder: 'descend',
            sorter: (a: IncomeExpense, b: IncomeExpense) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            render: (text: string) => (
                <p className='m-0 text-[12px] text-[#252525]'>
                    {dayjs(text).format('DD/MM/YYYY')}
                </p>
            ),
        },
        {
            title: 'Note',
            dataIndex: 'note',
            render: (text: string) => (
                <p className='m-0 text-[12px] text-[#252525]'>
                    {text}
                </p>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (text: number) => (
                <p className='m-0 text-[12px] text-[#252525]'>
                    {text.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
                </p>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            filters: [
                {
                    text: 'Income',
                    value: 'income',
                },
                {
                    text: 'Expense',
                    value: 'expense',
                }
            ],
            onFilter: (value: any, record: IncomeExpense) => record.type === value,
            render: (text: string, record: IncomeExpense) => {
                const displayText = text.charAt(0).toUpperCase() + text.slice(1)

                return (
                    <Tag className={`
                    ${record.type === 'expense'
                            ? 'text-[#FF7474] bg-[#FFBFBF] border-[#FF7474]'
                            : 'text-[#59CA47] bg-[#c1ffb773] border-[#59CA47]'} 
                    text-[10px] m-0 w-[80px] text-center`
                    }>
                        {displayText.length > 15 ? displayText.slice(0, 15) + '...' : displayText}
                    </Tag>
                )
            },
        },
    ]

    // Assign options
    useEffect(() => {
        // Extract unique options from the mockData
        const uniqueDatesSet = new Set<string>()

        const sortedData = mockData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        sortedData.forEach((item) => {
            const formattedDate = dayjs(item.createdAt).format('MM/YYYY')
            uniqueDatesSet.add(formattedDate)
        })

        // Convert set to array of objects with label and value properties
        const uniqueOptionsArray = Array.from(uniqueDatesSet).map((date) => ({
            label: date,
            value: date,
        }))

        // Update state with unique options
        setUniqueOptions(uniqueOptionsArray)
        if (!selectDate) {
            setFilteredData(mockData)
        }
    }, [])

    // Filter data based on selected option
    useEffect(() => {
        if (!selectDate) {
            setFilteredData(mockData)
        } else {
            const filteredData = mockData.filter((item) => {
                const formattedDate = dayjs(item.createdAt).format('MM/YYYY')
                return formattedDate === selectDate
            })
            setFilteredData(filteredData)
        }
    }, [selectDate])

    // Filter data base on search input
    useEffect(() => {
        if (!searchData) {
            setFilteredData(mockData)
        } else {
            const filteredData = mockData.filter((item) => {
                const lowerCaseSearch = searchData.toLowerCase()

                const noteMatch = item.note.toLowerCase().includes(lowerCaseSearch)
                const priceMatch = item.price.toString().includes(lowerCaseSearch)
                const categoryMatch = item.category.toLowerCase().includes(lowerCaseSearch)

                return noteMatch || priceMatch || categoryMatch
            })
            setFilteredData(filteredData)
        }
    }, [searchData])

    return (
        <section className='w-full bg-white rounded-[10px]'>
            <div className='flex flex-row items-center justify-between p-4'>
                <SectionHeader label='Income - Expense' />
                <Button className='p-[6px] hover:text-[#4096ff]'>
                    <TbFileExport size={16} className='text-[#404040] hover:text-[#4096ff]' />
                </Button>
            </div>
            <Divider className='m-0' />
            <div className='p-4 flex flex-col gap-4 mt-4'>
                <div className='flex flex-row justify-between'>
                    <Select
                        className='w-[180px] border-[#C8C8C8] text-[#252525] text-[12px]'
                        options={uniqueOptions}
                        placeholder='Select a Month/Year'
                        onChange={(value) => setSelectDate(value)}
                        allowClear
                    />
                    <Input
                        prefix={<HiMiniMagnifyingGlass color='#C8C8C8' className='text-base' />}
                        className='max-w-[214px] text-[#252525] text-[14px]'
                        placeholder='Enter to search'
                        onChange={(e) => setSearchData(e.target.value)}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        defaultPageSize: 6,
                        showSizeChanger: false,
                    }}
                />
            </div>
        </section>
    )
}

export default IncomeExpenseTabele