'use client'
import React, { useState, useEffect, FC } from 'react'
import moment, { Moment } from 'moment'
import { IoMenu } from 'react-icons/io5'
import { FaAngleLeft, FaAngleRight, FaRegCalendarAlt } from 'react-icons/fa'
import { LuPlus } from 'react-icons/lu'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'
import { BsFillPlusCircleFill, BsPinAngleFill } from 'react-icons/bs'
import PublicLayout from '../layouts/PublicLayout'
import axios from 'axios'
import AddAgendaModal from '@/components/Calendar/AddAgendaModal'
import SelectTypeModal from '@/components/Calendar/SelectTypeModal'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CalendarType, UserDTO } from '@/ts'

moment.updateLocale('en', {
    week: {
        dow: 1
    }
})

interface Type {
    _id: string;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

interface Agenda {
    _id: string;
    dateTime: string;
    typeOfService: string;
    serviceDuration: string;
    startTime: string;
    endTime: string;
    pauseTime: string;
    text: string;
    copyService: boolean;
    number: number;
    type: Type;
    toWho: string;
    lunch: boolean;
    hotMeal: boolean;
    createdAt: string;
}

const Calendari: FC<CalendarType> = ({userList}) => {

    const router = useRouter()

    const params = useParams<{ year: string; month: string }>()

    const initialYear = params.year ? parseInt(params.year as string, 10) : moment().year()
    const initialMonth = params.month ? parseInt(params.month as string, 10) : moment().month()
    

    const initialDate = moment(`${initialYear}-${initialMonth + 1}`, 'YYYY-MM')
    const [selectedDate, setSelectedDate] = useState<Moment>(initialDate.isValid() ? initialDate : moment())

    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const [agendas, setAgendas] = useState<Agenda[]>([])
    const [users, setUsers] = useState<UserDTO[] | undefined>(userList)
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false)
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<{_id: string; name: string; color: string }>({_id: '', name: '', color: '' })
    const [types, setTypes] = useState<{_id: string; name: string; color: string }[]>([])
    const [currentDate, setCurrentDate] = useState<string>('')

    const [viewMode, setViewMode] = useState<string>('grid')

    const [agenda, setAgenda] = useState<Agenda>()
    const [editData, setEditData] = useState({
        _id: agenda?._id!,
        serviceDuration: agenda?.serviceDuration!,
        text: agenda?.text!,
        toWho: agenda?.toWho!,
        typeOfService: agenda?.typeOfService!,
        startTime: agenda?.startTime!,
        endTime: agenda?.endTime!,
        pauseTime: agenda?.endTime!,
        copyService: agenda?.copyService!,
        number: agenda?.number!,
        lunch: agenda?.lunch!,
        hotMeal: agenda?.hotMeal!
    })

    useEffect(() => {
        const fetchAgendas = async () => {
            try {
                const response = await axios.get('/api/agendas')
                if (response.status === 200) {
                    setAgendas(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch agendas:', error)
            }
        }
        fetchAgendas()
    }, [])

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('/api/types')
                if (response.status === 200) {
                    setTypes(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch types:', error)
            }
        }
        fetchTypes()
    }, [])

    const renderAgendasForDay = (date: string) => {
        const filteredAgendas = agendas.filter((agenda) => moment(agenda.dateTime).isSame(date, 'day'))

        return (
            <div>
                {filteredAgendas.length === 0 ? null : (
                    <div className={`${viewMode === 'grid' ? 'w-full mx-auto p-1' : 'flex flex-wrap gap-2'}`}>
                        {filteredAgendas.map((agenda, index) => (
                            <div key={index} className={`p-1 mb-1 rounded whitespace-nowrap ${viewMode === 'grid' ? 'overflow-hidden text-ellipsis w-full' : 'w-fit'}`} style={{ backgroundColor: agenda.type?.color ?? '#F5AD9E', maxWidth: '100%' }}>
                                <div
                                    onClick={() => {
                                        setCurrentDate(agenda.dateTime)
                                        setSelectedType(agenda.type)
                                        setIsAgendaModalOpen(true)
                                        setAgenda(agenda)
                                    }} className={`${viewMode === 'grid' ? 'w-[12vw]' : 'w-fit'}`}>
                                    {moment(agenda.dateTime).format('MMM DD, YYYY')} - {moment(agenda.dateTime).format('hh:mm A')} - {agenda.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }


    const getAllDaysFromWeeksInMonth = (date: Moment) => {
        const startOfMonth = date?.clone().startOf('month')
        const endOfMonth = date?.clone().endOf('month')

        let startOfWeek = startOfMonth?.clone().startOf('week')
        let endOfWeek = endOfMonth?.clone().endOf('week')

        const days = []
        let currentDay = startOfWeek?.clone()

        while (currentDay?.isSameOrBefore(endOfWeek)) {
            days.push({
                dayName: currentDay.format('ddd'),
                dayNumber: currentDay.format('D'),
                date: currentDay.format('YYYY-MM-DD')
            })
            currentDay.add(1, 'day')
        }

        return days
    }

    const renderAgendasForStaffDay = (staffId:any, day:any) => {
        const staffAgendas = agendas.filter(
            (agenda) => agenda.toWho === staffId && moment(agenda.dateTime).isSame(day, 'day')
        )

        return (
            <div className='flex flex-col gap-1'>
                {staffAgendas.map((agenda, index) => (
                    <div key={index} className="p-1 rounded text-xs overflow-hidden  whitespace-nowrap" style={{ backgroundColor: agenda.type.color }}>
                        {agenda.text}
                    </div>
                ))}
            </div>
        )
    }

    const renderCalendarStaff = (selectedDate:any) => {
        const days = getAllDaysFromWeeksInMonth(selectedDate)
    
        const weeks = []
        let currentWeek:any = []
        let weekNumber = ''
    
        days.forEach((day, index) => {
            if (index % 7 === 0) {
                if (currentWeek.length > 0) {
                    weeks.push({ weekNumber, days: currentWeek })
                    currentWeek = []
                }
                weekNumber = moment(day.date).format('ww')
            }
            currentWeek.push(day)
        })
    
        if (currentWeek.length > 0) {
            weeks.push({ weekNumber, days: currentWeek })
        }
    
        return (
            <div className="flex flex-col overflow-auto w-full">
                <div className='flex w-full'>
                    <div className='w-[100px]  text-ellipsis flex justify-end items-center 2xl:mr-0 mr-3 invisible'>hhhh</div>
                    <div className="grid grid-flow-col w-full">
                        {weeks.map((week, index) => (
                            <div key={index} className=" text-center">
                                <div className="font-bold flex  text-xs py-2 px-2">Week {week.weekNumber}</div>
                                <div className="flex py-2">
                                    {week.days.map((day:any) => (
                                        <div key={day.date} className="flex-1 text-center text-xs min-w-8  w-8">
                                            <p>{day.dayName}</p>
                                            <p>{day.dayNumber}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col border-r w-[100vw]">
                        {users!.map((staff) => (
                            <div key={staff.id} className="flex">
                                <div className='w-[100px] max-w-[100px] text-ellipsis flex items-center justify-end p-2'>
                                    {staff.username}
                                </div>
                                <div className="flex w-full">
                                    {days.map((day) => (
                                        <div key={day.date} className="p-[3px] flex-1 border text-xs min-w-8 w-8">
                                            {renderAgendasForStaffDay(staff.id, day.date)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

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
                <div key={weekNumber} className='flex flex-col'>
                    <div className=''>
                        {Array(7).fill(0).map((_, index) => {
                            const day = weekStart.clone().add(index, 'days')
                            return (
                                <div key={day.format('YYYY-MM-DD')} className='flex items-start border-b text-xs group'>
                                    <div className='w-[15%] border-r p-2 flex flex-col gap-2'>
                                        <Link className='hover:underline' href={`/day/${initialYear}/${day.format('M')}/${day.date()}`}>{day.format('ddd YYYY-MM-DD')}</Link>
                                        <Link className='hover:underline' href={`/week/${initialYear}/${weekNumber}`}>
                                            Week {weekNumber}
                                        </Link>
                                    </div>
                                    <div className='w-full border-0 p-1 flex gap-2 relative'>
                                        <div className=' absolute top-1 left-1'>
                                            <BsFillPlusCircleFill
                                                size={20}
                                                color="#333"
                                                className="shadow-lg border-2 border-[#858585] rounded-full cursor-pointer shadow-custom hidden group-hover:block"
                                                onClick={() => {
                                                    setCurrentDate(day.format('YYYY-MM-DD'))
                                                    setIsTypeModalOpen(true)
                                                }}
                                            />
                                        </div>
                                        {renderAgendasForDay(day.format('YYYY-MM-DD'))}
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

    const renderCalendarGrid = () => {
        const monthStart = selectedDate.clone().startOf('month')
        const monthEnd = selectedDate.clone().endOf('month')
        const weeks: JSX.Element[] = []
        let week: JSX.Element[] = []

        const startOfMonth = monthStart.clone().startOf('week')

        while (startOfMonth.isBefore(monthEnd)) {
            const weekNumber = startOfMonth.format('ww')
            week.push(
                <div className="border-r border-b flex text-sm p-3 pr-1 hover:underline cursor-pointer justify-end" key={`week-${weekNumber}`}>
                    <Link href={`/week/${initialYear}/${weekNumber}`}>Week</Link> <span>{weekNumber}</span>
                </div>
            )

            for (let i = 0; i < 7; i++) {
                const day = startOfMonth.clone().add(i, 'days')
                week.push(
                    <div key={day.format('YYYY-MM-DD')} className={`border-r w-full border-t relative ${day.isSame(monthStart, 'month') ? 'opacity-100' : 'opacity-30'}`}>
                        <div className="w-full flex justify-between gap-1 px-1 group">
                            <LuPlus
                                color="#bcbcbc"
                                className="shadow-lg border-2 border-[#858585] rounded-full cursor-pointer shadow-custom hidden group-hover:block"
                                onClick={() => {
                                    setCurrentDate(day.format('YYYY-MM-DD'))
                                    setIsTypeModalOpen(true)
                                }}
                            />
                            <div className="text-[11px] flex gap-[3px] ml-auto uppercase font-semibold group-hover:underline">
                                <span>{day.format('ddd')}</span>
                                {day.format('D')}
                            </div>
                        </div>
                        <div className="text-xs text-[#5c1405]">{renderAgendasForDay(day.format('YYYY-MM-DD'))}</div>
                    </div>
                )
            }

            weeks.push(
                <div className="grid grid-cols-[5.5%_13.5%_13.5%_13.5%_13.5%_13.5%_13.5%_13.5%]" key={`week-${weekNumber}`}>
                    {week}
                </div>
            )
            week = []

            startOfMonth.add(1, 'week')
        }

        return weeks
    }

    useEffect(() => {
        if (params.year && params.month) {
            const newDate = moment(`${params.year}-${params.month}`, 'YYYY-MM')
            if (newDate.isValid()) {
                setSelectedDate(newDate)
            }
        }
    }, [params.year, params.month])

    const handleViewModeChange = (mode: string) => {
        setViewMode(mode)
        localStorage.setItem('viewMode', mode)
    }

    const handleMonthChange = (direction: 'prev' | 'next') => {
        const newDate = selectedDate.clone().add(direction === 'prev' ? -1 : 1, 'month')
        setSelectedDate((prevDate) => prevDate.clone().add(direction === 'prev' ? -1 : 1, 'month'))
        router.push(`/calendar/${newDate.year()}/${newDate.month() + 1}`)
    }

    const addNewAgenda = (newAgenda: Agenda) => {
        setAgendas((prevAgendas) => [...prevAgendas, {...newAgenda, type: { ...newAgenda.type }}])
    }

    const renderCalendarContent = () => {
        switch (viewMode) {
        case 'list':
            return renderCalendarList()
        case 'staff':
            return renderCalendarStaff(selectedDate)
        case 'grid':
        default:
            return renderCalendarGrid()
        }
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = moment(e.target.value)
        if (date.isValid()) {
            setSelectedDate(date)
        }
        router.push(`/calendar/${date.year()}/${date.month() + 1}`)
    }

    return (
        <PublicLayout title='Calendar'>
            <div className="mx-10 mt-32 mb-10">
                <div className="flex items-center justify-between w-full mb-10">
                    <div className="flex items-center gap-6">
                        <div className="border rounded-md p-2 px-3 w-fit">
                            <IoMenu size={'1.5em'} />
                        </div>
                        <span className="w-36">{selectedDate.format('MMMM YYYY')}</span>
                        <div className="flex items-center gap-4 border rounded-md w-fit px-4">
                            <button className="" onClick={() => handleMonthChange('prev')}>
                                <FaAngleLeft />
                            </button>
                            <div className="border-x p-3">
                                {/* <FaRegCalendarAlt /> */}
                                <div className="relative inline-block">
                                    <input type="date" onChange={handleDateChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <span className="relative text-gray-600 text-lg cursor-pointer">
                                        <FaRegCalendarAlt />
                                    </span>
                                </div>
                            </div>
                            <button className="" onClick={() => handleMonthChange('next')}>
                                <FaAngleRight />
                            </button>
                        </div>
                        <div className="border px-5 py-2 rounded-lg cursor-pointer" onClick={() => setSelectedDate(moment())}>
                            Today
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600">
                            <Link href={`/day/${moment().year()}/${moment().month() + 1}/${moment().date()}`}>DAY</Link>
                            <Link href={`/week/${selectedDate.year()}/${selectedDate.week()}`} className='border-x p-[.9em]'>WEEK</Link>
                            <Link href={`/calendar/${selectedDate.year()}/${selectedDate.month() + 1}`}>MONTH</Link>
                        </div>

                        <div className=''>
                            <select className="border p-[.45em] w-36" onChange={(e) => handleViewModeChange(e.target.value)}>
                                <option value="grid">Grid view</option>
                                <option value="staff">Staff view</option>
                                <option value="list">List view</option>
                            </select>
                        </div>

                        <div className="p-[.6em] border rounded-md bg-gray-300">
                            <HiDotsHorizontal />
                        </div>

                        <div className="flex items-center gap-2 border bg-gray-300 p-2 px-3 text-sm rounded-md">
                            <div className="rotate-180">
                                <MdFileDownload />
                            </div>
                            <span className="text-sm font-medium">TO PUBLISH</span>
                        </div>

                        <div>
                            <BsPinAngleFill />
                        </div>
                    </div>
                </div>
                <div className={`${viewMode === 'staff' ? 'border-0 w-full mx-auto' : 'border w-full mx-auto'}`}>
                    {renderCalendarContent()}
                </div>
                <SelectTypeModal
                    isOpen={isTypeModalOpen}
                    onClose={() => setIsTypeModalOpen(false)}
                    types={types}
                    onSelectType={(type) => {
                        setSelectedType(type)
                        setIsTypeModalOpen(false)
                        setIsAgendaModalOpen(true)
                    }}
                />
                <AddAgendaModal isOpen={isAgendaModalOpen} onClose={() => setIsAgendaModalOpen(false)} onAddAgenda={addNewAgenda} selectedType={selectedType} selectedDate={currentDate} agendaId={agenda?._id} />
            </div>
        </PublicLayout>
    )
}

export default Calendari
