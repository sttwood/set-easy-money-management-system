import React from 'react'

type TotalSavingsCardProps = {
  icon: React.ReactNode
  title: string
  value: number
  rateColor?: string
  gain?: number
  rate?: number
}

const TotalSavingsCard = ({
  icon,
  title,
  value,
  rateColor,
  gain,
  rate
}: TotalSavingsCardProps) => {
  let rateOperator = ''
  let rateGain = 0
  if (rate) {
    rateOperator = rate > 0 ? '+ ' : '- '
  } else {
    if (gain) {
      rateGain = parseFloat(((gain - value) / value * 100).toFixed(2))
    }
  }

  return (
    <div className='flex flex-row items-end gap-[18px] py-3 px-[18px] border-[#F4F5F8] border-[1.5px] rounded-[10px] w-full'>
      {icon}
      <span className='flex flex-col'>
        <p className='m-0 text-[#404040] text-[14px] font-semibold'>
          {title}
        </p>
        <p className={`m-0 text-[#252525] text-base font-semibold`}>
          {value.toLocaleString('en-US', {style: 'currency', currency: 'THB'})}
        </p>
        <p className={`m-0 ${rateColor} text-[10px] font-semibold`}>
          {!rate && gain?.toLocaleString('en-US', {style: 'currency', currency: 'THB'}) + ' '}
          {rate && 'interest rate '}({rate !== null && rateOperator ? rateOperator : rateGain} {rate}%)
        </p>
      </span>
    </div>
  )
}

export default TotalSavingsCard