'use client'

import moment, { Moment } from 'moment'
import { FC, ReactNode, useEffect, useState } from 'react'
import { FaRegCalendarAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { FiInfo } from 'react-icons/fi'
import { BsFillPlusCircleFill, BsPinAngleFill } from 'react-icons/bs'
import { Day, Plan } from '@/ts'
import { sampleData } from '@/data'
import Link from 'next/link'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'
import PublicLayout from '../layouts/PublicLayout'
import { useParams, useRouter } from 'next/navigation'

const WeekView: FC = (): ReactNode => {
    
    const params = useParams<{ year: string; week: string }>()

    const initialYear = params.year ? parseInt(params.year as string, 10) : moment().year()
    const initialWeek = params.week ? parseInt(params.week as string, 10) : moment().week()

    const [week, setWeek] = useState<number>(initialWeek)
    const [days, setDays] = useState<Day[]>([])
    const router = useRouter()

    console.log(week)
    

    useEffect(() => {
        setDays(getDaysByWeekNumber(initialYear, week))
    }, [week])

    const getDaysByWeekNumber = (year: number, weekNumber: number): Day[] => {
        const firstDay = moment().year(year).isoWeek(weekNumber).startOf('isoWeek')
        return Array.from({ length: 7 }, (_, i) => {
            const currentDay = moment(firstDay).add(i, 'days')
            return {
                day: currentDay.format('ddd'),
                date: currentDay.format('DD MMM'),
                fullDate: currentDay.format('YYYY-MM-DD'),
                isCurrentWeek: currentDay.isSame(moment(), 'week')
            }
        })
    }

    const renderPlansForDay = (fullDate: string, plans: Plan[], bgColor: string) => {
        const filteredPlans = plans.filter(plan => moment(plan.dateTime).isSame(fullDate, 'day'))
        return (
            filteredPlans.length > 0 && (
                <div className='w-[95%] mx-auto'>
                    {filteredPlans.map((plan, index) => (
                        <div key={index} className={` w-full bg-[#F5AD9E] p-1 mb-1 rounded whitespace-nowrap overflow-hidden text-ellipsis ${bgColor}`}>
                            {moment(plan.dateTime).format('MMM DD, YYYY')} - {moment(plan.dateTime).format('hh:mm A')} - {plan.text}
                        </div>
                    ))}
                </div>
            )
        )
    }

    const handlePreviousWeek = () => setWeek(prevWeek => Math.max(prevWeek - 1, 1))
    const handleNextWeek = () => setWeek(week + 1)

    const currentDayStyle = (d: Day, color: string) => moment(d.fullDate).isSame(moment(), 'day') ? color : ''

    const contentTypes = ['AGENDA', 'SCHEDULE_1', 'UNPRODUCTIVE', 'UNAVAILABLE']
    const contentColors: Record<string, [string, string]> = {
        AGENDA: ['bg-[#f0cd43]', 'bg-[#faecb0]'],
        SCHEDULE_1: ['bg-[#E5320C]', 'bg-[#F5AD9E]'],
        UNPRODUCTIVE: ['bg-[#ff4040]', 'bg-[#ffadac]'],
        UNAVAILABLE: ['bg-[#979797]', 'bg-[#b0afaf]']
    }

    return (
        <PublicLayout title='Week'>
            <div className='flex items-center justify-between mb-10 mx-24 mt-10'>
                <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
                    <button onClick={handlePreviousWeek}>
                        <FaAngleLeft />
                    </button>
                    <div className='border-x p-3'>
                        <FaRegCalendarAlt />
                    </div>
                    <button onClick={handleNextWeek}>
                        <FaAngleRight />
                    </button>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600'>
                        <Link href='/day'>DAY</Link>
                        <Link href='/week' className='border-x p-[.9em]'>WEEK</Link>
                        <Link href={`/calendar/${moment().year()}/${moment().month() + 1}`}>MONTH</Link>
                    </div>

                    <div>
                        <select className='border rounded-md p-[.45em] w-36'>
                            <option value="">Staff view</option>
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
            <div className='w-[85%] mx-auto border-y'>
                <div className='grid grid-cols-7 border-b divide-x'>
                    {days.map((d, index) => (
                        <div key={index} className={`font-medium text-sm py-3 text-center col-span-1 ${currentDayStyle(d, 'bg-[#00000012]')}`}>
                            {d.day} {d.date}
                            <span className='w-fit float-right mt-1 mr-3'><FiInfo /></span>
                        </div>
                    ))}
                </div>
                {contentTypes.map((label, labelIndex) => (
                    <div key={labelIndex}>
                        <div className='my-1 grid grid-cols-7'>
                            {days.map((d, index) => (
                                <div
                                    key={index}
                                    className={`p-1 text-xs text-left text-white w-full flex justify-between items-center group hover:cursor-pointer ${contentColors[label][0]} ${currentDayStyle(d, contentColors[label][1])}`}
                                >
                                    {index === 0 ? label : ''}
                                    <BsFillPlusCircleFill size={16} className='shadow-lg rounded-full cursor-pointer shadow-custom hidden ml-auto group-hover:block' />
                                </div>
                            ))}
                        </div>
                        <div className='grid grid-cols-7 divide-x border-b'>
                            {days.map((d, index) => (
                                <div key={index} className={`font-medium text-xs py-1 overflow-hidden whitespace-nowrap ${currentDayStyle(d, 'bg-[#00000012]')}`}>
                                    {renderPlansForDay(d.fullDate, sampleData[label], contentColors[label][1])}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PublicLayout>
    )
}

export default WeekView