import SectionHeader from '@/components/SectionHeader'
import {Button, Divider, Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import React from 'react'
import {TbFileExport} from 'react-icons/tb'
import {GoGraph} from "react-icons/go";
import {PiPiggyBankLight} from "react-icons/pi";
import TotalSavingsCard from '@/components/TotalSavingsCard'

const SavingsTable = () => {

    const mockData = [
        {
            key: 1,
            year: '2023',
            capital: 1000,
            pre_value: 1000,
            interest: 10,
            total: 1100
        },
        {
            key: 2,
            year: '2024',
            capital: 10000,
            pre_value: 10000,
            interest: 2.5,
            total: 10250
        },
        {
            key: 3,
            year: '2025',
            capital: 10000,
            pre_value: 20250,
            interest: 2.5,
            total: 25312.5
        },
        {
            key: 4,
            year: '2026',
            capital: 20000,
            pre_value: 45312.5,
            interest: 2,
            total: 54375
        },
        {
            key: 5,
            year: '2027',
            capital: 25000,
            pre_value: 79375,
            interest: 2.2,
            total: 96837.5
        }
    ]

    const columns: ColumnsType<any> = [
        {
            title: 'Year',
            dataIndex: 'year',
        },
        {
            title: 'Capital',
            dataIndex: 'capital',
        },
        {
            title: 'Present Value',
            dataIndex: 'pre_value',
        },
        {
            title: 'Interest',
            dataIndex: 'interest',
        },
        {
            title: 'Total',
            dataIndex: 'total',
        }
    ]

    const totalCardData = [
        {
            icon: <PiPiggyBankLight size={38} />,
            title: 'Total Saving',
            value: 60000,
            gain: 65556.22,
            rateColor: 'text-[#59CA47]'
        },
        {
            icon: <GoGraph size={38} />,
            title: 'Total Interest',
            value: 5556.22,
            rate: 2.75,
            rateColor: 'text-[#FAB121]'
        }
    ]

    return (
        <section className='w-full bg-white rounded-[10px]'>
            <div className='flex flex-row items-center justify-between p-4'>
                <SectionHeader label='Savings' />
                <Button className='p-[6px] hover:text-[#4096ff]'>
                    <TbFileExport size={16} className='text-[#404040] hover:text-[#4096ff]' />
                </Button>
            </div>
            <Divider className='m-0' />
            <div className='p-4 flex flex-col gap-4 mt-4'>
                <div className='flex flex-row justify-between gap-[10px]'>
                    {totalCardData.map((item, index) => <TotalSavingsCard key={index} {...item} />)}
                </div>
                <Table
                    columns={columns}
                    dataSource={mockData}
                />
            </div>
        </section>
    )
}

export default SavingsTable