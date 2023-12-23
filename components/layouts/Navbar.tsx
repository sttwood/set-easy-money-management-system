import Image from 'next/image'
import React from 'react'

import {Dropdown} from 'antd'
import {TiArrowSortedDown} from "react-icons/ti";

import Avatar from '/public/images/avatar.jpg'
import TH from '/public/images/language/th.png'
import ENG from '/public/images/language/us.png'

const Navbar = () => {
    return (
        <nav className='fixed z-[1000] w-full bg-[#A2D2FF] text-[#ffffff] py-2'>
            <div className='container flex flex-row justify-between items-center mx-auto'>
                {/* Left Menu */}
                <div className='flex flex-row items-center gap-2'>
                    <p className='text-[46px] font-bold m-0 font-[Inter]'>SET</p>
                    <span className='flex flex-col text-base'>
                        <p className='m-0'>Easy Money</p>
                        <p className='m-0'>Management System</p>
                    </span>
                </div>

                {/* Right Menu */}
                <div className='flex flex-row items-center gap-5'>
                    <div className='flex flex-row items-center gap-3'>
                        <p className='m-0'>Settawut Borrisut</p>
                        <Image
                            src={Avatar}
                            alt='avatar'
                            width={44}
                            height={44}
                            className='rounded-full'
                        />
                    </div>
                    {/* Change Language */}
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    label: (
                                        <div className="flex gap-2 items-center">
                                            <Image
                                                src={ENG}
                                                alt="us"
                                                width="15"
                                                height="15"
                                            />
                                            <p className="whitespace-nowrap">English</p>
                                        </div>
                                    ),
                                    key: "0"
                                },
                                {
                                    label: (
                                        <div className="flex gap-2 items-center">
                                            <Image
                                                src={TH}
                                                alt="us"
                                                width="15"
                                                height="15"
                                            />
                                            <p className="whitespace-nowrap">
                                                ไทย
                                            </p>
                                        </div>
                                    ),
                                    key: "1"
                                },
                            ]
                        }}
                        trigger={["click"]}
                        className='z-[999999]'
                    >
                        <div className="flex items-center cursor-pointer">
                            <div className="flex items-center justify-between px-2 gap-[5px]">
                                <div className="flex gap-1 items-center">
                                    <Image
                                        src={ENG}
                                        alt="us"
                                        width="18"
                                        height="18"
                                    />
                                    <p className="text-[#ffffff] whitespace-nowrap text-[18px] font-semibold ease-in duration-300">
                                        EN
                                    </p>
                                </div>
                                <TiArrowSortedDown size={16} className="text-[#ffffff] ease-in duration-300" />
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}

export default Navbar