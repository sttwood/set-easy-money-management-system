import {Savings} from '@/apis/types/financial'
import {Button, Space, Table} from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {FaRegEdit} from "react-icons/fa"
import {RiDeleteBinLine} from "react-icons/ri"

type TableSectionProps = {
  data: Savings[]
  interestRate: number
}

const TableSection = ({data, interestRate}: TableSectionProps) => {

  const columns = [
    {
      title: 'Month',
      dataIndex: 'createAt',
      render: (text: string) => (
        <p className='m-0 text-[12px] text-[#252525]'>
          {dayjs(text).format('MM/YYYY')}
        </p>
      )
    },
    {
      title: 'Deposit amount',
      dataIndex: 'deposit',
      render: (text: number) => (
        <p className='m-0 text-[12px] text-[#252525]'>
          {text.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
        </p>
      )
    },
    {
      title: 'Present value',
      dataIndex: 'present_value',
      render: (text: number) => (
        <p className='m-0 text-[12px] text-[#252525]'>
          {text.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
        </p>
      )
    },
    {
      title: <p>Interest ({interestRate})</p>,
      dataIndex: 'interest_rate',
      render: (text: string, record: Savings) => {
        return (
          <p className='m-0 text-[12px] text-[#252525]'>
            {record.interest.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
          </p>
        )
      },
    },
    {
      title: 'Total value',
      dataIndex: 'total_value',
      render: (text: string, record: Savings) => {
        return (
          <p className='m-0 text-[12px] text-[#252525]'>
            {record.total_value.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
          </p>
        )
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (record: Savings) => (
        <Space size='small'>
          <Button
            className='p-[6px] border-0 shadow-none'
            onClick={() => {}}
          >
            <FaRegEdit size={16} className='text-[#404040] hover:text-[#fccc3d]' />
          </Button>
          <Button className='p-[6px] border-0 shadow-none'>
            <RiDeleteBinLine size={18} className='text-[#404040] hover:text-[#f84848] pt-[1px]' />
          </Button>
        </Space>
      )
    }
  ]

  return (
    <section className='w-full flex flex-col gap-6'>
      <div className='flex flex-col gap-6 bg-white rounded-[10px] p-4 w-full'>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 25, 50, 100],
          }}
        />
      </div>
    </section>
  )
}

export default TableSection