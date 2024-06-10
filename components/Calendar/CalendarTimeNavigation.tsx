import React, { FC, ReactNode } from 'react'
import { IoMenu } from 'react-icons/io5'
import { FaAngleLeft, FaAngleRight, FaRegCalendarAlt } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'
import { BsPinAngleFill } from 'react-icons/bs'
import Link from 'next/link'

type CalendarTimeNavigationType = {
    selectedDate: string
    leftButton: () => void
    rightButton: () => void
}

const CalendarTimeNavigation:FC<CalendarTimeNavigationType> = (props):ReactNode => {

    const {
        selectedDate,
        leftButton,
        rightButton
    } = props
    return (
        <div className='flex items-center justify-between w-full mb-10'>
            <div className='flex items-center gap-6'>
                <div className='border rounded-md p-2 px-3 w-fit'><IoMenu size={'1.5em'} /></div>
                <span>{selectedDate}</span>
                <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
                    <button className='' onClick={leftButton}><FaAngleLeft /></button>
                    <input type='calendar' className='border-x p-3'><FaRegCalendarAlt /></input>
                    <button className='' onClick={rightButton}><FaAngleRight /></button>
                </div>
                <div className='border px-5 py-2 rounded-md'>Today</div>
            </div>

            <div className='flex items-center gap-4'> 
                <div className='flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600'>
                    <Link href='/day'>DAY</Link>
                    <Link href='/week' className='border-x p-[.9em]'>WEEK</Link>
                    <Link href='/calendar'>MONTH</Link> 
                </div>

                <div>
                    <select className='border rounded-md p-[.45em] w-36'>
                        <option value="">Staf view</option>
                        <option value="">Grid view</option>
                    </select>
                </div>

                <div className='p-[.6em] border rounded-md bg-gray-300'><HiDotsHorizontal /></div>

                <div className='flex items-center gap-2 border bg-gray-300 p-2 px-3 text-sm rounded-md'>
                    <div className='rotate-180'><MdFileDownload /></div>
                    <span className='text-sm font-medium'>TO PUBLISH</span>
                </div>

                <div>
                    <BsPinAngleFill />
                </div>
            </div>
        </div>
    )
}

export default CalendarTimeNavigation