"use client"
import React, {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {motion, useAnimation} from 'framer-motion'

import {FaArrowLeft, FaArrowRight, FaDollarSign} from 'react-icons/fa6'
import {RxDashboard} from 'react-icons/rx'
import {RiBankLine} from 'react-icons/ri'
import {useMenubarData} from '@/context/MenubarContext'

function Sidebar() {
    const {updateMenubarData} = useMenubarData()
    const pathname = usePathname()
    const controls = useAnimation()
    const [isCollapsed, setIsCollapsed] = useState(true)

    const toggleIsCollapsed = () => {
        setIsCollapsed(!isCollapsed)
        updateMenubarData(isCollapsed)
    }

    useEffect(() => {
        controls.start({width: !isCollapsed ? 244 : 84})
    }, [isCollapsed])

    const MenuList = [
        {
            icon: <RxDashboard size={16} className={isCollapsed ? 'mb-1' : 'mb-0'} />,
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            icon: <FaDollarSign size={16} className={isCollapsed ? 'mb-1' : 'mb-0'} />,
            title: 'Income-Expenses',
            href: '/income-expenses',
        },
        {
            icon: <RiBankLine size={16} className={isCollapsed ? 'mb-1' : 'mb-0'} />,
            title: 'Savings',
            href: '/savings',
        },
    ]

    return (
        <motion.aside
            className="h-full max-w-[244px] bg-white px-4 py-[18px] fixed z-10"
            style={{
                overflow: 'auto',
                height: '100vh',
            }}
            animate={controls}
        >
            <div className="flex flex-col gap-[26px]">
                <div className={`flex flex-row items-center ${!isCollapsed ? 'justify-between' : 'justify-center'}`}>
                    {!isCollapsed &&
                        <p className="text-[14px] text-[#C8C8C8] m-0">
                            Menu
                        </p>
                    }
                    <span
                        className="text-white bg-[#A2D2FF] rounded-full p-1.5 cursor-pointer"
                        onClick={toggleIsCollapsed}
                    >
                        {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
                    </span>
                </div>

                <ul className="flex flex-col gap-3">
                    {MenuList.map((item, index) => (
                        <li
                            key={index}
                            className={``}
                        >
                            <Link
                                href={item.href}
                                className={`flex flex-row items-center ${pathname === item.href && 'bg-[#F2F9FF]'
                                    } p-3 hover:bg-[#F2F9FF] rounded-[10px] ${isCollapsed ? 'gap-0 justify-center ' : 'gap-3'} transition ease-in duration-200`}
                            >
                                {item.icon}
                                {!isCollapsed && item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.aside>
    )
}

export default Sidebar