"use client"
import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Modal, Select, Space} from 'antd'
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

export type FieldType = {
    note: string
    price: number
    createdAt: Date
    type: string
    category: string
}

const IncomeAndExpenese = () => {
    const [form] = Form.useForm()
    const controls = useAnimation()
    const {collapsed} = useMenubarData()
    const [selectDate, setSelectDate] = useState<string>('')
    const [filteredData, setFilteredData] = useState<IncomeExpense[]>([])
    const [uniqueOptions, setUniqueOptions] = useState<SelectOption[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [actionType, setActionType] = useState('')
    const [editItem, setEditItem] = useState<IncomeExpense | null>(null)

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

    const handleEdit = (item: IncomeExpense) => {
        setEditItem(item)
        setActionType('edit')
        setIsModalOpen(true)
        form.setFieldsValue({
            note: item.note,
            price: item.price,
            type: item.type,
            category: item.category
        })
    }

    const handleOk = () => {
        console.log('ok')
        setLoading(true)
        form.setFieldsValue({
            note: null,
            price: null,
            type: null,
            category: null
        })
        setTimeout(() => {
            setLoading(false)
            setIsModalOpen(false)
        }, 3000)
    }

    const handleCancel = () => {
        console.log('cancel')
        setIsModalOpen(false)
        form.setFieldsValue({
            note: null,
            price: null,
            type: null,
            category: null
        })
    }

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
                        <Button className='bg-[#5388D8] hover:bg-[#4079cf] text-white border-0 px-[80px] h-[50px]' onClick={() => {
                            setIsModalOpen(true)
                            setActionType('add')
                        }}>
                            <p className='hover:text-[#ebebeb] text-white text-base'>+ New List</p>

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
                    setActionType={setActionType}
                    setIsModalOpen={setIsModalOpen}
                    handleEdit={handleEdit}
                />
                <CardSection
                    title='Expense'
                    data={filterExpenseData}
                    setActionType={setActionType}
                    setIsModalOpen={setIsModalOpen}
                    handleEdit={handleEdit}
                />
            </div>

            <Modal
                width={500}
                open={isModalOpen}
                title={<p className='text-[#39434F] text-[24px] font-semibold text-center pt-6'>{actionType === 'edit' ? 'Edit information' : 'Create New information'}</p>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                        className='bg-[#456FF7] hover:bg-[#fccc3d]'
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Form<FieldType>
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{modifier: 'public'}}
                    className='p-5 pb-6 flex flex-col gap-3'
                >
                    <Form.Item
                        name="note"
                        label={<p className='text-base text-[#242424] m-0'>Description</p>}
                        className='m-0 w-full'
                    >
                        <Input placeholder="Enter your description" size="large" />
                    </Form.Item>
                    <Space>
                        <Form.Item
                            name="price"
                            label={<p className='text-base text-[#242424] m-0'>Price</p>}
                            rules={[{required: true, message: 'Please input the Price!'}]}
                            className='m-0 w-full'
                        >
                            <Input placeholder="Enter your price" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label={<p className='text-base text-[#242424] m-0'>Price</p>}
                            rules={[{required: true, message: 'Please input the Price!'}]}
                            className='m-0 w-full'
                        >
                            <Input placeholder="Enter your price" size="large" />
                        </Form.Item>
                    </Space>
                    <Space>
                        <Form.Item
                            name="category"
                            label={<p className='text-base text-[#242424] m-0'>Category Label</p>}
                            rules={[{required: true, message: 'Please input the subTitle!'}]}
                            className='m-0 w-full'
                        >
                            <Input placeholder="Enter your category" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label={<p className='text-base text-[#242424] m-0'>Category Label</p>}
                            rules={[{required: true, message: 'Please input the subTitle!'}]}
                            className='m-0 w-full'
                        >
                            <Input placeholder="Enter your category" size="large" />
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </motion.div>
    )
}

export default IncomeAndExpenese