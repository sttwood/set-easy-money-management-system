import React from 'react'
import Image from 'next/image'

import incomeIcon from '/public/images/income.png'
import expenseIcon from '/public/images/expense.png'
import remainingIcon from '/public/images/wallet.png'

function TotalSection() {
    return (
        <>
            <div className='flex flex-row justify-between items-center gap-[30px]'>
                {/* Income */}
                <section className='flex flex-row gap-6 w-full bg-white p-4 rounded-[10px]'>
                    <div className='flex justify-center items-center py-[22px] px-[17px] bg-[#C1FFB774] rounded-full'>
                        <Image
                            src={incomeIcon}
                            alt='Income Icon'
                            width={42}
                            height={32}
                            className='max-w-[42px] max-h-[32px]'
                        />
                    </div>
                    <div>
                        <p className='m-0 text-base text-[#404040] font-semibold'>
                            Total Income
                        </p>
                        <p className='m-0 text-[24px] text-[#59CA47] font-semibold'>
                            ฿ 20,000.00
                        </p>
                        <p className='m-0 text-[12px] text-[#C8C8C8] font-semibold'>
                            Since 01/2024 - Now
                        </p>
                    </div>
                </section>
                {/* Expense */}
                <section className='flex flex-row gap-6 w-full bg-white p-4 rounded-[10px]'>
                    <div className='flex justify-center items-center py-[22px] px-[17px] bg-[#FFBFBF] rounded-full'>
                        <Image
                            src={expenseIcon}
                            alt='Income Icon'
                            width={42}
                            height={32}
                            className='max-w-[42px] max-h-[32px]'
                        />
                    </div>
                    <div>
                        <p className='m-0 text-base text-[#404040] font-semibold'>
                            Total Expense
                        </p>
                        <p className='m-0 text-[24px] text-[#FF7474] font-semibold'>
                            ฿ 15,000.00
                        </p>
                        <p className='m-0 text-[12px] text-[#C8C8C8] font-semibold'>
                            Since 01/2024 - Now
                        </p>
                    </div>
                </section>
                {/* Total Remaining */}
                <section className='flex flex-row gap-6 w-full bg-white p-4 rounded-[10px]'>
                    <div className='flex justify-center items-center py-[22px] px-[17px] bg-[#FFBE4074] rounded-full'>
                        <Image
                            src={remainingIcon}
                            alt='Income Icon'
                            width={42}
                            height={32}
                            className='max-w-[42px] max-h-[32px]'
                        />
                    </div>
                    <div>
                        <p className='m-0 text-base text-[#404040] font-semibold'>
                            Total Remaining
                        </p>
                        <p className='m-0 text-[24px] text-[#FAB121] font-semibold'>
                            ฿ 5,000.00
                        </p>
                        <p className='m-0 text-[12px] text-[#C8C8C8] font-semibold'>
                            Since 01/2024 - Now
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default TotalSection