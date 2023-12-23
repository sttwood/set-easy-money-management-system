import {screenSize} from '@/apis/types/screenSize';
import SectionHeader from '@/components/SectionHeader';
import {BarChart, axisClasses} from '@mui/x-charts'
import {Select} from 'antd';
import React from 'react'

type GraphSectionProps = {
    screenSize: screenSize
}

const chartSetting = {
    yAxis: [
        {
            label: 'Financial (THB)',
        },
    ],
    height: 384,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-5px, 0)',
        },
    },
};

const valueFormatter = (value: number) => `THB ${value}`

const dataset = [
    {
        income: 59,
        expense: 57,
        savings: 86,
        month: 'Jan',
    },
    {
        income: 50,
        expense: 52,
        savings: 78,
        month: 'Feb',
    },
    {
        income: 47,
        expense: 53,
        savings: 106,
        month: 'Mar',
    },
    {
        income: 54,
        expense: 56,
        savings: 92,
        month: 'Apr',
    },
    {
        income: 57,
        expense: 69,
        savings: 92,
        month: 'May',
    },
    {
        income: 60,
        expense: 63,
        savings: 103,
        month: 'June',
    },
    {
        income: 59,
        expense: 60,
        savings: 105,
        month: 'July',
    },
    {
        income: 65,
        expense: 60,
        savings: 106,
        month: 'Aug',
    },
    {
        income: 51,
        expense: 51,
        savings: 95,
        month: 'Sept',
    },
    {
        income: 60,
        expense: 65,
        savings: 97,
        month: 'Oct',
    },
    {
        income: 67,
        expense: 64,
        savings: 76,
        month: 'Nov',
    },
    {
        income: 61,
        expense: 70,
        savings: 103,
        month: 'Dec',
    },
];

const GraphSection = ({screenSize}: GraphSectionProps) => {

    const monthData = [
        'January',
        'Febury',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const shortMonthData = monthData.map((month) => month.slice(0, 3))

    const seriesData = [
        {
            dataKey: 'income',
            label: 'Income',
            valueFormatter,
            color: '#C1FFB774'
        },
        {
            dataKey: 'expense',
            label: 'Expense',
            valueFormatter,
            color: '#FFBFBF'
        },
        {
            dataKey: 'savings',
            label: 'Savings',
            valueFormatter,
            color: '#FFBE4074'
        }
    ]

    return (
        <section className='w-full bg-white pt-4 pl-4 rounded-[10px]'>
            <div className='flex flex-row justify-between w-full pr-12'>
                <SectionHeader label='Summary Graph' />
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
            <div className='pl-6'>
                <BarChart
                    dataset={dataset}
                    xAxis={[{
                        scaleType: 'band',
                        dataKey: 'month',
                        data: (screenSize.width && screenSize.width > 1300) ? monthData : shortMonthData
                    }]}
                    series={seriesData}
                    {...chartSetting}
                />
            </div>
        </section>
    )
}

export default GraphSection