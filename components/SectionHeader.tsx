import React from 'react'

type SectionHeaderProps = {
  label: string
  textStyle?: string
}

const SectionHeader = ({label, textStyle}: SectionHeaderProps) => {
  return (
    <>
      <h2 className={`${textStyle} text-[16px] text-[#252525] font-semibold`}>
        {label}
      </h2>
    </>
  )
}

export default SectionHeader