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
import PublicLayout from '../layouts/PublicLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios'

moment.updateLocale('en', {
    week: {
        dow: 1
    }
})

interface Agenda {
  _id: string;
  dateTime: string;
  text: string;
  type: { name: string; color: string };
  createdAt: string;
}




const Calendar: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Moment>(moment())
    const [agendas, setAgendas] = useState<Agenda[]>([])
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false)
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false)
    const [selectedType, setSelectedType] = useState<{ name: string; color: string }>({ name: '', color: '' })
    const [types, setTypes] = useState<{ name: string; color: string }[]>([])
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

    const filterAgendasForDate = (date: Moment): Agenda[] => {
        return agendas.filter((agenda) => moment(agenda.dateTime).isSame(date, 'day'))
    }

    const renderAgendasForDay = (date: string) => {
        const filteredAgendas = agendas.filter((agenda) => moment(agenda.dateTime).isSame(date, 'day'))

        return (
            <div>
                {filteredAgendas.length === 0 ? null : (
                    <div className='w-[95%] mx-auto'>
                        {filteredAgendas.map((agenda, index) => (
                            <div key={index} className='p-1 mb-1 flex whitespace-nowrap overflow-hidden text-ellipsis rounded' style={{ backgroundColor: agenda.type?.color ?? '#F5AD9E', maxWidth: '100%' }}>
                                <div className='w-[12vw]'>
                                    {moment(agenda.dateTime).format('MMM DD, YYYY')} - {moment(agenda.dateTime).format('hh:mm A')} - {agenda.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const renderCalendar = () => {
        const monthStart = selectedDate.clone().startOf('month')
        const monthEnd = selectedDate.clone().endOf('month')
        const weeks: JSX.Element[] = []
        let week: JSX.Element[] = []

        const startOfMonth = monthStart.clone().startOf('week')

        while (startOfMonth.isBefore(monthEnd)) {
            const weekNumber = startOfMonth.format('ww')
            week.push(
                <div className="border-r border-b flex text-sm p-3 pr-1 hover:underline cursor-pointer justify-end" key={`week-${weekNumber}`}>
                    <span>Week</span> <span>{weekNumber}</span>
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

    const handleMonthChange = (amount: number) => {
        const newDate = selectedDate.clone().add(amount, 'month')
        setSelectedDate(newDate)
    }

    const addNewAgenda = (newAgenda: Agenda) => {
        setAgendas((prevAgendas) => [...prevAgendas, {...newAgenda, type: { ...newAgenda.type }}])
    }

    return (
        <PublicLayout title='Calendar'>
            <div className="mx-10 mt-32">
                <div className="flex items-center justify-between w-full mb-10">
                    <div className="flex items-center gap-6">
                        <div className="border rounded-md p-2 px-3 w-fit">
                            <IoMenu size={'1.5em'} />
                        </div>
                        <span className="w-36">{selectedDate.format('MMMM YYYY')}</span>
                        <div className="flex items-center gap-4 border rounded-md w-fit px-4">
                            <button className="" onClick={() => handleMonthChange(-1)}>
                                <FaAngleLeft />
                            </button>
                            <div className="border-x p-3">
                                <FaRegCalendarAlt />
                            </div>
                            <button className="" onClick={() => handleMonthChange(1)}>
                                <FaAngleRight />
                            </button>
                        </div>
                        <div className="border px-5 py-2 rounded-md" onClick={() => setSelectedDate(moment())}>
            Today
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600">
                            <span className="p-[.9em]">DAY</span>
                            <span className="border-x p-[.9em]">WEEK</span>
                            <span className="p-[.9em]">MONTH</span>
                        </div>

                        <div>
                            <select className="border rounded-md p-[.45em] w-36">
                                <option value="">Staff view</option>
                                <option value="">Grid view</option>
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
                <div className="border w-full mx-auto">
                    <>{renderCalendar()}</>
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
                <AddAgendaModal isOpen={isAgendaModalOpen} onClose={() => setIsAgendaModalOpen(false)} onAddAgenda={addNewAgenda} selectedType={selectedType} selectedDate={currentDate} />
            </div>
        </PublicLayout>
    )
}

export default Calendar