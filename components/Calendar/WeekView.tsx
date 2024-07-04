'use client'

import moment, { Moment } from 'moment'
import { FC, ReactNode, useEffect, useState } from 'react'
import { FaRegCalendarAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { FiInfo } from 'react-icons/fi'
import { BsFillPlusCircleFill, BsPinAngleFill } from 'react-icons/bs'
import { Day, UserDTO } from '@/ts'
import Link from 'next/link'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'
import PublicLayout from '../layouts/PublicLayout'
import { useParams, useRouter } from 'next/navigation'
import { IoMenu } from 'react-icons/io5'
import axios from 'axios'
import AddAgendaModal from './AddAgendaModal'

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

const WeekView: FC = (): ReactNode => {
    
    const params = useParams<{ year: string; week: string }>()

    const initialYear = params.year ? parseInt(params.year as string, 10) : moment().year()
    const initialWeek = params.week ? parseInt(params.week as string, 10) : moment().week()

    const initialDate = moment(`${initialYear}-${initialWeek}`, 'YYYY-WW')
    const [selectedDate, setSelectedDate] = useState<Moment>(initialDate.isValid() ? initialDate : moment())

    const [week, setWeek] = useState<number>(initialWeek)
    const [days, setDays] = useState<Day[]>([])
    const [agendas, setAgendas] = useState<Agenda[]>([])
    const [types, setTypes] = useState<{_id: string; name: string; color: string }[]>([])
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<{_id: string; name: string; color: string }>({_id: '', name: '', color: '' })
    const [currentDate, setCurrentDate] = useState<string>('')

    const [users, setUsers] = useState<UserDTO[]>()

    const [agenda, setAgenda] = useState<Agenda>()

    const router = useRouter()


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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/staff')
                if (response.status === 200) {
                    setUsers(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch types:', error)
            }
        }
        fetchUser()
    }, [])

    

    useEffect(() => {
        setDays(getDaysByWeekNumber(initialYear, week))
    }, [week])

    const addNewAgenda = (newAgenda: Agenda) => {
        setAgendas((prevAgendas) => [...prevAgendas, {...newAgenda, type: { ...newAgenda.type }}])
    }

    const getDaysByWeekNumber = (year: number, weekNumber: number): Day[] => {
        const firstDay = moment().year(year).isoWeek(weekNumber).startOf('isoWeek')
        return Array.from({ length: 7 }, (_, i) => {
            const currentDay = moment(firstDay).add(i, 'days')
            return {
                day: currentDay.format('ddd'),
                date: currentDay.format('DD MMM'),
                dayNum: currentDay.format('D'),
                fullDate: currentDay.format('YYYY-MM-DD'),
                isCurrentWeek: currentDay.isSame(moment(), 'week')
            }
        })
    }

    const getUserForAgendas = (userId:string) => {
        const user = users?.find(user => user.id === userId)

        return user?.firstName
    }

    const renderPlansForDay = (fullDate: string, bgColor: string, type: string) => {
        const filteredPlans = agendas.filter(
            (plan) => moment(plan.dateTime).isSame(fullDate, 'day') && plan.type?.name === type
        )
        return (
            filteredPlans.length > 0 && (
                <div className='w-[95%] mx-auto'>
                    {filteredPlans.map((plan, index) => (
                        <div
                            onClick={() => {
                                setCurrentDate(plan.dateTime)
                                setSelectedType(plan.type)
                                setIsAgendaModalOpen(true)
                                setAgenda(plan)
                            }} key={index} className={' w-full p-1 mb-1 rounded whitespace-nowrap overflow-hidden text-ellipsis'} style={{backgroundColor: bgColor}}>
                            {plan.startTime} - {plan.endTime} - {plan.type.name !== 'Agenda' ? getUserForAgendas(plan.toWho) : ''} {plan.text}
                        </div>
                    ))}
                </div>
            )
        )
    }

    const handleWeekChange = (direction: 'prev' | 'next') => {
        const newDate = selectedDate.clone().add(direction === 'prev' ? -1 : 1, 'week')
        setSelectedDate((prevDate) => prevDate.clone().add(direction === 'prev' ? -1 : 1, 'week'))
        router.push(`/week/${newDate.year()}/${newDate.week()}`)
    }

    const currentDayStyle = (d: Day, color: string) => moment(d.fullDate).isSame(moment(), 'day') ? color : ''

    return (
        <PublicLayout title='Week'>
            <div className='flex items-center justify-between mb-10 mx-24 mt-10'>
                <div className='flex items-center gap-6'>
                    <div className='border rounded-md p-2 px-3 w-fit'><IoMenu size={'1.5em'} /></div>
                    <div className='flex items-center gap-4'>
                        WEEK {selectedDate.format('WW YYYY')}
                    </div>
                    <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
                        <button onClick={() => handleWeekChange('prev')}>
                            <FaAngleLeft />
                        </button>
                        <div className='border-x p-3'>
                            <FaRegCalendarAlt />
                        </div>
                        <button onClick={() => handleWeekChange('next')}>
                            <FaAngleRight />
                        </button>
                    </div>

                    <div className="border px-5 py-2 rounded-lg cursor-pointer" onClick={() => router.push(`/week/${moment().year()}/${moment().week()}`)}>
                            Today
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600'>
                        <Link href={`/day/${moment().year()}/${moment().month() + 1}/${moment().date()}`}>DAY</Link>
                        <Link href={`/week/${moment().year()}/${moment().month() + 1}/${moment().date()}`} className='border-x p-[.9em]'>WEEK</Link>
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
                        <Link href={`/day/${initialYear}/${selectedDate.month() + 1}/${d.dayNum}`} key={index} className={`font-medium text-sm py-3 text-center col-span-1 hover:underline ${currentDayStyle(d, 'bg-[#00000012]')}`}>
                            {d.day} {d.date}
                            <span className='w-fit float-right mt-1 mr-3'><FiInfo /></span>
                        </Link>
                    ))}
                </div>
                {types.map((label, labelIndex) => (
                    <div key={labelIndex}>
                        <div className='my-1 grid grid-cols-7'>
                            {days.map((d, index) => (
                                <div
                                    key={index}
                                    className={`p-1 text-xs text-left text-black w-full flex justify-between items-center group hover:cursor-pointer ${currentDayStyle(d, label.color)}`} style={{backgroundColor: label.color}}
                                >
                                    {index === 0 ? label.name : ''}
                                    <BsFillPlusCircleFill size={16} 
                                        onClick={() => {
                                            setCurrentDate(d.fullDate)
                                            setSelectedType(label)
                                            setIsAgendaModalOpen(true)
                                        }} className='shadow-lg rounded-full cursor-pointer shadow-custom hidden ml-auto group-hover:block' />
                                </div>
                            ))}
                        </div>
                        <div className='grid grid-cols-7 divide-x border-b'>
                            {days.map((d, index) => (
                                <div key={index} className={`font-medium text-xs py-1 overflow-hidden whitespace-nowrap ${currentDayStyle(d, 'bg-[#00000012]')}`}>
                                    {renderPlansForDay(d.fullDate, label.color, label.name)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <AddAgendaModal isOpen={isAgendaModalOpen} onClose={() => setIsAgendaModalOpen(false)} onAddAgenda={addNewAgenda} selectedType={selectedType} selectedDate={currentDate} agendaId={agenda?._id} />
        </PublicLayout>
    )
}

export default WeekView