import { IoCalendarNumberOutline } from 'react-icons/io5'
import { AiOutlineStock } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FC, ReactNode } from 'react'
import Link from 'next/link'
import moment from 'moment'

const ResourcesNavLinks: FC = (): ReactNode => {
    const textStyle = 'text-lg font-medium text-center'
    const hoverBoxStyle = 'hover:shadow-xl hover:border hover:bg-gray-50 hover:cursor-pointer duration-200 ease-in'

    // Merrni muajin dhe vitin aktual
    const currentMonth = moment().format('MM')
    const currentYear = moment().format('YYYY')

    return (
        <>
            <div className='flex items-center gap-3'>
                <Link href={`/calendar/${currentYear}/${currentMonth}`} className={`border w-36 border-transparent p-8 rounded ${hoverBoxStyle}`}>
                    <div className='w-fit mx-auto'><IoCalendarNumberOutline size={60} /></div>
                    <div className={`${textStyle}`}>Schedule</div>
                </Link>
                <Link href='/office' className={`border w-36 border-transparent p-8 rounded ${hoverBoxStyle}`}>
                    <div><AiOutlineStock size={60} /></div>
                    <div className={`${textStyle}`}>Office</div>
                </Link>
                <Link href='/staff' className={`border w-36 border-transparent p-8 rounded ${hoverBoxStyle}`}>
                    <div><BsFillPeopleFill size={60} /></div>
                    <div className={`${textStyle}`}>Staff</div>
                </Link>
            </div>
        </>
    )
}

export default ResourcesNavLinks
