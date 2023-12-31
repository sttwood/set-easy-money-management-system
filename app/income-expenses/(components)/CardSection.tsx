import {IncomeExpense} from '@/apis/types/financial'
import SectionHeader from '@/components/SectionHeader'
import {DefaultizedPieValueType, PieChart, pieArcLabelClasses} from '@mui/x-charts'
import {Button, Form, Input, Modal, Space, Table, Tag} from 'antd'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {BsClipboard2Data} from 'react-icons/bs'
import {GiReceiveMoney, GiPayMoney} from "react-icons/gi"
import {HiMiniMagnifyingGlass} from 'react-icons/hi2'
import {FaRegEdit} from "react-icons/fa"
import {RiDeleteBinLine} from "react-icons/ri"

type CardSectionProps = {
  title: string
  data: IncomeExpense[]
  setActionType: React.Dispatch<React.SetStateAction<string>>
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleEdit: (item: IncomeExpense) => void
}

const PieArcLabel = ({totalValue}: {totalValue: number}) => {
  const data = [
    {label: 'Group A', value: 400, color: '#0088FE'},
    {label: 'Group B', value: 300, color: '#00C49F'},
    {label: 'Group C', value: 300, color: '#FFBB28'},
    {label: 'Group D', value: 200, color: '#FF8042'},
  ];

  const sizing = {
    margin: {right: 5},
    height: 254,
    legend: {hidden: true},
  };

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / totalValue;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          arcLabel: getArcLabel,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}

const CardSection = ({title, data, setActionType, setIsModalOpen, handleEdit}: CardSectionProps) => {
  const [searchData, setSearchData] = useState('')
  const [filteredData, setFilteredData] = useState<IncomeExpense[]>([])
  // Action
  const [selectedRowKeys, setSelectedRowKeys] = useState<number>()

  let totalText = (title === 'Income')
    ? 'Total Income'
    : 'Total Expense'
  let totalIcon = (title === 'Income')
    ? <GiReceiveMoney size={24} />
    : <GiPayMoney size={24} />
  let totalValue = data.reduce((acc, curr) => acc + curr.price, 0)

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createAt',
      render: (text: string) => (
        <p className='m-0 text-[12px] text-[#252525]'>
          {dayjs(text).format('DD/MM/YYYY')}
        </p>
      )
    },
    {
      title: 'Description',
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
      render: (text: number) => (
        <p className='m-0 text-[12px] text-[#252525]'>
          {text.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
        </p>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
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
    {
      title: 'Action',
      dataIndex: '',
      render: (record: IncomeExpense) => (
        <Space size='small'>
          <Button
            className='p-[6px] border-0 shadow-none'
            onClick={() => {
              setSelectedRowKeys(record.key)
              handleEdit(record)
            }}
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

  // Filter data base on search input
  useEffect(() => {
    if (!searchData) {
      setFilteredData(data)
    } else {
      const filteredData = data.filter((item) => {
        const lowerCaseSearch = searchData.toLowerCase();

        const noteMatch = item.note.toLowerCase().includes(lowerCaseSearch);
        const priceMatch = item.price.toString().includes(lowerCaseSearch);
        const categoryMatch = item.category.toLowerCase().includes(lowerCaseSearch);

        return noteMatch || priceMatch || categoryMatch;
      });
      setFilteredData(filteredData)
    }
  }, [searchData])

  return (
    <section className='w-full flex flex-col gap-6'>
      <div className='bg-white rounded-[10px] p-4 w-full'>
        <div className='flex flex-row justify-between items-center'>
          <SectionHeader label={title} textStyle='text-[#252525] text-[20px]' />
          <Button className='p-[6px] hover:text-[#4096ff]'>
            <BsClipboard2Data size={16} className='text-[#404040] hover:text-[#4096ff]' />
          </Button>
        </div>
        <PieArcLabel totalValue={totalValue} />
      </div>

      <div className='flex flex-col gap-6 bg-white rounded-[10px] p-4 w-full'>
        <div className='flex flex-col xl:flex-row justify-between gap-3'>
          <div className='flex flex-row gap-[10px] bg-gray-50 w-full xl:w-fit p-2 px-4 rounded'>
            {totalIcon}
            <p className='m-0 text-[#252525]'>
              <span className='font-semibold'>{totalText}:</span> {totalValue.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
            </p>
          </div>
          <Input
            prefix={<HiMiniMagnifyingGlass color='#C8C8C8' className='text-base' />}
            className='w-full xl:w-[214px] text-[#252525] text-[14px] max-h-[40px]'
            placeholder='Enter to search'
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>

        <Table
          dataSource={filteredData}
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

export default CardSection