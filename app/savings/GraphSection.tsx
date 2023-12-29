import SectionHeader from '@/components/SectionHeader';
import {BarChart} from '@mui/x-charts';
import {Select} from 'antd';
import React from 'react'

const GraphSection = () => {

  return (
    <section className='w-full bg-white pt-4 pl-4 rounded-[10px]'>
      <div className='pl-6'>
      <BarChart
        height={300}
        series={
          series.map((s) => ({...s}))
        }
        xAxis={[
          {
            scaleType: 'band',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
          }
        ]}
      />
      </div>
    </section>
  )
}

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
} as const

const series = [
  {
    label: 'Interest',
    data: [550, 1300, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500, 10500],
    color: '#A2D2FF',
  },
  {
    label: 'Total',
    data: [20550, 31390.13, 42528.36, 53972.89, 65556.22, 77156.33, 88730.23, 100000, 110000, 120000, 130000],
    color: '#2E96FF',
  }
].map((s) => ({...s, highlightScope}))

export default GraphSection