'use client'

import { agendas, schedules, unproductive, available, unavailable } from '@/data'
import { Plan, PlansData } from '@/ts'
import moment, { Moment } from 'moment'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { BsFillPlusCircleFill, BsPinAngleFill } from 'react-icons/bs'
import { FaAngleLeft, FaAngleRight, FaRegCalendarAlt } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoMenu } from 'react-icons/io5'
import { MdFileDownload } from 'react-icons/md'
import PublicLayout from '../layouts/PublicLayout'
import { useEffect, useState } from 'react'
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

const DayView = () => {

    const router = useRouter()
    const params = useParams<{ year: string; month: string; day:string }>()

    const date = moment(`${params.year}-${params.month}-${params.day}`, 'YYYY-MM-DD')
    const formattedDate = date.format('ddd DD MMMM')

    const [selectedDate, setSelectedDate] = useState<Moment>(date.isValid() ? date : moment())

    const initialYear = params.year ? parseInt(params.year as string, 10) : moment().year()
    const initialMonth = params.month ? parseInt(params.month as string, 10) - 1 : moment().month()
    const initialDay = params.day ? parseInt(params.day as string, 10) : moment().day()
    const [agendas, setAgendas] = useState<Agenda[]>([])
    const [types, setTypes] = useState<{_id: string; name: string; color: string }[]>([])
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<{_id: string; name: string; color: string }>({_id: '', name: '', color: '' })
    const [currentDate, setCurrentDate] = useState<string>('')

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

    const addNewAgenda = (newAgenda: Agenda) => {
        setAgendas((prevAgendas) => [...prevAgendas, {...newAgenda, type: { ...newAgenda.type }}])
    }

    const renderPlansForDay = (typeName:string, bgColor:string) => {
        const filteredPlans = agendas.filter(
            (plan) => moment(plan.dateTime).isSame(selectedDate, 'day') && plan.type?.name === typeName
        )
        return (
            <div className='w-full'>
                {filteredPlans.map((d, i) => (
                    <div key={i} className={'w-full p-1 rounded mb-1 text-xs'} style={{backgroundColor: bgColor}}>
                        {moment(d.dateTime).format('MMM DD, YYYY')} - {moment(d.dateTime).format('hh:mm A')} - {d.text}
                    </div>
                ))}
            </div>
        )
    }

    const handlePreviousDay = () => {
        const newDate = selectedDate.clone().subtract(1, 'day')
        setSelectedDate(selectedDate.clone().subtract(1, 'day'))
        router.push(`/day/${newDate.year()}/${newDate.month() + 1}/${newDate.date()}`)
    }

    const handleNextDay = () => {
        const newDate = selectedDate.clone().add(1, 'day')
        setSelectedDate(selectedDate.clone().add(1, 'day'))
        console.log(newDate.day())
        router.push(`/day/${newDate.year()}/${newDate.month() + 1}/${newDate.date()}`)
    }

    return (
        <PublicLayout title='Day View'>
            <div className='w-[80%] mx-auto mt-16'>
                <div className='flex items-center justify-between w-full mb-10'>
                    <div className='flex items-center gap-6'>
                        <div className='border rounded-md p-2 px-3 w-fit'><IoMenu size={'1.5em'} /></div>
                        <span>{selectedDate.format('ddd DD MMMM')}</span>
                        <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
                            <button className='' onClick={handlePreviousDay}><FaAngleLeft /></button>
                            <div className='border-x p-3'><FaRegCalendarAlt /></div>
                            <button className='' onClick={handleNextDay}><FaAngleRight /></button>
                        </div>
                        <div className='border px-5 py-2 rounded-md'>Today</div>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className="flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600">
                            <Link href={`/day/${initialYear}/${initialMonth}/${initialDay}`}>DAY</Link>
                            <Link href={`/week/${moment().year()}/${moment().week()}`} className='border-x p-[.9em]'>WEEK</Link>
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
                {types.map((type, index) => (
                    <div key={index}>
                        <div className={`text-xs p-1 text-white mb-1 font-medium flex justify-between group ${type.color}`} style={{backgroundColor: type.color}}>
                            {type.name}
                            <BsFillPlusCircleFill size={16} 
                                onClick={() => {
                                    setCurrentDate(date.toString())
                                    setSelectedType(type)
                                    setIsAgendaModalOpen(true)
                                }} className='shadow-lg rounded-full cursor-pointer shadow-custom hidden ml-auto group-hover:block' />
                        </div>
                        <div className='border-b-2 mb-1'>
                            {renderPlansForDay(type.name, type.color)}
                        </div>
                    </div>
                ))}
            </div>

            <AddAgendaModal isOpen={isAgendaModalOpen} onClose={() => setIsAgendaModalOpen(false)} onAddAgenda={addNewAgenda} selectedType={selectedType} selectedDate={currentDate} />
        </PublicLayout>
    )
}

export default DayView
