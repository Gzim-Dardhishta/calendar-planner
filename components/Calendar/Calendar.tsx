'use client'
import React, { useState, useEffect, FC } from 'react'
import moment, { Moment } from 'moment'
import { IoMenu } from 'react-icons/io5'
import { FaAngleLeft, FaAngleRight, FaRegCalendarAlt } from 'react-icons/fa'
import { LuPlus } from 'react-icons/lu'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'
import { BsPinAngleFill } from 'react-icons/bs'
import { sampleAgendas } from '@/data'
import { Agenda } from '@/ts'
import PublicLayout from '../layouts/PublicLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

moment.updateLocale('en', {
    week: {
        dow: 1
    }
})

// const Calendar: FC = () => {
//     const router = useRouter()
//     const params = useParams<{ year: string; month: string }>()

//     const initialYear = params.year ? parseInt(params.year as string, 10) : moment().year()
//     const initialMonth = params.month ? parseInt(params.month as string, 10) - 1 : moment().month()

//     const initialDate = moment(`${initialYear}-${initialMonth + 1}`, 'YYYY-MM')
//     const [selectedDate, setSelectedDate] = useState<Moment>(initialDate.isValid() ? initialDate : moment())

//     const [agendas, setAgendas] = useState<Agenda[]>([])

//     const filterAgendasForDate = (date: Moment): Agenda[] => {
//         return sampleAgendas.filter((agenda) =>
//             moment(agenda.dateTime).isSame(date, 'day')
//         )
//     }

//     useEffect(() => {
//         const agendasForDate = filterAgendasForDate(selectedDate)
//         setAgendas(agendasForDate)
//     }, [selectedDate])

//     const renderAgendasForDay = (date: string) => {
//         const filteredAgendas = sampleAgendas.filter((agenda) =>
//             moment(agenda.dateTime).isSame(date, 'day')
//         )

//         return (
//             <div>
//                 {filteredAgendas.length === 0 ? null : (
//                     <div className='w-[95%] mx-auto'>
//                         {filteredAgendas.map((agenda, index) => (
//                             <div key={index} className=' bg-[#F5AD9E] p-1 mb-1 flex whitespace-nowrap overflow-hidden text-ellipsis rounded' style={{ maxWidth: '100%' }}>
//                                 <div className='w-[12vw]'>
//                                     {moment(agenda.dateTime).format('MMM DD, YYYY')} - {moment(agenda.dateTime).format('hh:mm A')} - {agenda.text}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     const renderCalendar = () => {
//         const monthStart = selectedDate.clone().startOf('month')
//         const monthEnd = selectedDate.clone().endOf('month')
//         const weeks: JSX.Element[] = []
//         let week: JSX.Element[] = []

//         const startOfMonth = monthStart.clone().startOf('week')

//         while (startOfMonth.isBefore(monthEnd)) {
//             const weekNumber = startOfMonth.format('ww')
//             week.push(
//                 <Link href={`/week/${initialYear}/${weekNumber}`} className='border-r border-b flex text-sm p-3 pr-1 hover:underline cursor-pointer justify-end' key={`week-${weekNumber}`}>
//                     <span>Week</span> <span>{weekNumber}</span>
//                 </Link>
//             )

//             for (let i = 0; i < 7; i++) {
//                 const day = startOfMonth.clone().add(i, 'days')
//                 week.push(
//                     <div
//                         key={day.format('YYYY-MM-DD')}
//                         className={`border-r w-full border-t relative z-0 ${day.isSame(monthStart, 'month') ? 'opacity-100' : 'opacity-30'}`}
//                     >
//                         <div className='w-full flex justify-between gap-1 px-1 group'>
//                             <LuPlus
//                                 color='#bcbcbc'
//                                 className='shadow-lg border-2 border-[#858585] rounded-full cursor-pointer shadow-custom hidden group-hover:block'
//                             />
//                             <div className='text-[11px] flex gap-[3px] ml-auto uppercase font-semibold group-hover:underline'>
//                                 <span>{day.format('ddd')}</span>
//                                 {day.format('D')}
//                             </div>
//                         </div>

//                         <div className='text-xs text-[#5c1405]'>
//                             {renderAgendasForDay(day.format('YYYY-MM-DD'))}
//                         </div>
//                     </div>
//                 )
//             }

//             weeks.push(<div className=' grid grid-cols-[5.5%_13.5%_13.5%_13.5%_13.5%_13.5%_13.5%_13.5%]' key={`week-${weekNumber}`}>{week}</div>)
//             week = []

//             startOfMonth.add(1, 'week')
//         }

//         return weeks
//     }

//     useEffect(() => {
//         if (params.year && params.month) {
//             const newDate = moment(`${params.year}-${params.month}`, 'YYYY-MM')
//             if (newDate.isValid()) {
//                 setSelectedDate(newDate)
//             }
//         }
//     }, [params.year, params.month])

//     const handleMonthChange = (amount: number) => {
//         const newDate = selectedDate.clone().add(amount, 'month')
//         setSelectedDate(newDate)
//         router.push(`/calendar/${newDate.year()}/${newDate.month() + 1}`)
//     }

//     return (
//         <PublicLayout title='Calendar'>
//             <div className='mx-10 mt-32'>
//                 <div className='flex items-center justify-between w-full mb-10'>
//                     <div className='flex items-center gap-6'>
//                         <div className='border rounded-md p-2 px-3 w-fit'><IoMenu size={'1.5em'} /></div>
//                         <span className='w-36'>{selectedDate.format('MMMM YYYY')}</span>
//                         <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
//                             <button className='' onClick={() => handleMonthChange(-1)}><FaAngleLeft /></button>
//                             <div className='border-x p-3'><FaRegCalendarAlt /></div>
//                             <button className='' onClick={() => handleMonthChange(1)}><FaAngleRight /></button>
//                         </div>
//                         <div className='border px-5 py-2 rounded-md' onClick={() => setSelectedDate(moment())}>Today</div>
//                     </div>

//                     <div className='flex items-center gap-4'>
//                         <div className='flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600'>
//                             <Link href='/day'>DAY</Link>
//                             <Link href={`/week/${selectedDate.year()}/${selectedDate.week()}`} className='border-x p-[.9em]'>WEEK</Link>
//                             <Link href={`/calendar/${selectedDate.year()}/${selectedDate.month() + 1}`}>MONTH</Link>
//                         </div>

//                         <div>
//                             <select className='border rounded-md p-[.45em] w-36'>
//                                 <option value="">Staff view</option>
//                                 <option value="">List view</option>
//                                 <option value="">Grid view</option>
//                             </select>
//                         </div>

//                         <div className='p-[.6em] border rounded-md bg-gray-300'><HiDotsHorizontal /></div>

//                         <div className='flex items-center gap-2 border bg-gray-300 p-2 px-3 text-sm rounded-md'>
//                             <div className='rotate-180'><MdFileDownload /></div>
//                             <span className='text-sm font-medium'>TO PUBLISH</span>
//                         </div>

//                         <div>
//                             <BsPinAngleFill />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='border w-full mx-auto'>
        
//                     <>
//                         {renderCalendar()}
//                     </>
//                 </div>
//             </div>
//         </PublicLayout>
//     )
// }

// export default Calendar

const Calendar: FC = () => {
    const router = useRouter()
    const params = useParams<{ year: string; month: string }>()

    const initialYear = params.year ? parseInt(params.year as string, 10) : moment().year()
    const initialMonth = params.month ? parseInt(params.month as string, 10) - 1 : moment().month()

    const initialDate = moment(`${initialYear}-${initialMonth + 1}`, 'YYYY-MM')
    const [selectedDate, setSelectedDate] = useState<Moment>(initialDate.isValid() ? initialDate : moment())
    const [viewMode, setViewMode] = useState<string>('grid')

    const [agendas, setAgendas] = useState<Agenda[]>([])

    const filterAgendasForDate = (date: Moment): Agenda[] => {
        return sampleAgendas.filter((agenda) =>
            moment(agenda.dateTime).isSame(date, 'day')
        )
    }

    useEffect(() => {
        const agendasForDate = filterAgendasForDate(selectedDate)
        setAgendas(agendasForDate)
    }, [selectedDate])

    const renderAgendasForDay = (date: string) => {
        const filteredAgendas = sampleAgendas.filter((agenda) =>
            moment(agenda.dateTime).isSame(date, 'day')
        )

        return (
            <>
                {filteredAgendas.length === 0 ? null : (
                    <div className='w-fit text-xs gap-2'>
                        {filteredAgendas.map((agenda, index) => (
                            <div key={index} className=' bg-[#F5AD9E] p-1 mb-1 flex whitespace-nowrap overflow-hidden text-ellipsis rounded' style={{ maxWidth: '100%' }}>
                                <div className='w-[12vw]'>
                                    {moment(agenda.dateTime).format('MMM DD, YYYY')} - {moment(agenda.dateTime).format('hh:mm A')} - {agenda.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )
    }

    const renderCalendarGrid = () => {
        const monthStart = selectedDate.clone().startOf('month')
        const monthEnd = selectedDate.clone().endOf('month')
        const weeks: JSX.Element[] = []
        let week: JSX.Element[] = []

        const startOfMonth = monthStart.clone().startOf('week')

        while (startOfMonth.isBefore(monthEnd)) {
            const weekNumber = startOfMonth.format('ww')
            week.push(
                <Link href={`/week/${initialYear}/${weekNumber}`} className='border-r border-b flex text-sm p-3 pr-1 hover:underline cursor-pointer justify-end' key={`week-${weekNumber}`}>
                    <span>Week</span> <span>{weekNumber}</span>
                </Link>
            )

            for (let i = 0; i < 7; i++) {
                const day = startOfMonth.clone().add(i, 'days')
                week.push(
                    <div
                        key={day.format('YYYY-MM-DD')}
                        className={`border-r w-full border-t relative z-0 ${day.isSame(monthStart, 'month') ? 'opacity-100' : 'opacity-30'}`}
                    >
                        <div className='w-full flex justify-between gap-1 px-1 group'>
                            <LuPlus
                                color='#bcbcbc'
                                className='shadow-lg border-2 border-[#858585] rounded-full cursor-pointer shadow-custom hidden group-hover:block'
                            />
                            <div className='text-[11px] flex gap-[3px] ml-auto uppercase font-semibold group-hover:underline'>
                                <span>{day.format('ddd')}</span>
                                {day.format('D')}
                            </div>
                        </div>

                        <div className='text-xs text-[#5c1405]'>
                            {renderAgendasForDay(day.format('YYYY-MM-DD'))}
                        </div>
                    </div>
                )
            }

            weeks.push(<div className=' grid grid-cols-[5.5%_13.5%_13.5%_13.5%_13.5%_13.5%_13.5%_13.5%]' key={`week-${weekNumber}`}>{week}</div>)
            week = []

            startOfMonth.add(1, 'week')
        }

        return weeks
    }

    // const renderCalendarList = () => {
    //     const daysInMonth = selectedDate.daysInMonth()
    //     const days: JSX.Element[] = []

    //     for (let i = 1; i <= daysInMonth; i++) {
    //         const day = selectedDate.clone().date(i)
    //         days.push(
    //             <div key={day.format('YYYY-MM-DD')} className='flex items-start border-b py-2'>
    //                 <div className='w-[15%] border-r pr-4 text-sm'>
    //                     <div className='font-semibold'>{day.format('ddd YYYY-MM-DD')}</div>
    //                     <div>Week {day.format('W')}</div>
    //                 </div>
    //                 <div className='w-3/4 px-2'>
    //                     {renderAgendasForDay(day.format('YYYY-MM-DD'))}
    //                 </div>
    //             </div>
    //         )
    //     }

    //     return <div>{days}</div>
    // }

    const renderCalendarList = () => {
        const monthStart = selectedDate.clone().startOf('month')
        const monthEnd = selectedDate.clone().endOf('month')
        const weeks: JSX.Element[] = []
        let currentWeekStart = monthStart.clone().startOf('week')
    
        while (currentWeekStart.isBefore(monthEnd)) {
            const weekStart = currentWeekStart.clone()
            const weekNumber = weekStart.format('W')
            const year = weekStart.format('YYYY')
            weeks.push(
                <div key={weekNumber} className='flex flex-col '>
                    <div className=''>
                        {Array(7).fill(0).map((_, index) => {
                            const day = weekStart.clone().add(index, 'days')
                            return (
                                <div key={day.format('YYYY-MM-DD')} className='flex items-start border-b text-xs'>
                                    <div className='w-[15%] border-r p-2'>
                                        <div>{day.format('ddd YYYY-MM-DD')}</div> 
                                        <Link className='hover:underline' href={`/week/${initialYear}/${weekNumber}`}>
                                            Week {weekNumber}
                                        </Link>
                                    </div>
                                    <div className='w-full border-0 p-1'>
                                        {day.isBefore(monthStart) ? null : renderAgendasForDay(day.format('YYYY-MM-DD'))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
            currentWeekStart.add(1, 'week')
        }
    
        return <div>{weeks}</div>
    }

    useEffect(() => {
        if (params.year && params.month) {
            const newDate = moment(`${params.year}-${params.month}`, 'YYYY-MM')
            if (newDate.isValid()) {
                setSelectedDate(newDate)
            }
        }
    }, [params.year, params.month])

    const handleMonthChange = (amount: number) => {
        const newDate = selectedDate.clone().add(amount, 'month')
        setSelectedDate(newDate)
        router.push(`/calendar/${newDate.year()}/${newDate.month() + 1}`)
    }

    return (
        <PublicLayout title='Calendar'>
            <div className='mx-10 mt-32'>
                <div className='flex items-center justify-between w-full mb-10'>
                    <div className='flex items-center gap-6'>
                        <div className='border rounded-md p-2 px-3 w-fit'><IoMenu size={'1.5em'} /></div>
                        <span className='w-36'>{selectedDate.format('MMMM YYYY')}</span>
                        <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
                            <button className='' onClick={() => handleMonthChange(-1)}><FaAngleLeft /></button>
                            <div className='border-x p-3'><FaRegCalendarAlt /></div>
                            <button className='' onClick={() => handleMonthChange(1)}><FaAngleRight /></button>
                        </div>
                        <div className='border px-5 py-2 rounded-md' onClick={() => setSelectedDate(moment())}>Today</div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600'>
                            <Link href={`/day/${selectedDate.year()}/${selectedDate.week()}/${selectedDate.day()}`}>DAY</Link>
                            <Link href={`/week/${selectedDate.year()}/${selectedDate.week()}`} className='border-x p-[.9em]'>WEEK</Link>
                            <Link href={`/calendar/${selectedDate.year()}/${selectedDate.month() + 1}`}>MONTH</Link>
                        </div>

                        <div>
                            <select className='border rounded-md p-[.45em] w-36' onChange={(e) => setViewMode(e.target.value)}>
                                <option value="grid">Grid view</option>
                                <option value="list">List view</option>
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
                <div className='border w-full mx-auto'>
                    {viewMode === 'list' ? renderCalendarList() : renderCalendarGrid()}
                </div>
            </div>
        </PublicLayout>
    )
}

export default Calendar