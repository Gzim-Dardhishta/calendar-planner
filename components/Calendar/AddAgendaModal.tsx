
import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { ITypeOfService } from '../TypeOfServices/TypeOfServices'
import { EditAgendaType, UserDTO } from '@/ts'
import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'

interface AddAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgenda: (newAgenda: any) => void;
  selectedType: {_id: string; name: string; color: string };
  selectedDate: string;
  agendaId: string | undefined;
}

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
  title: string
  startTime: string;
  endTime: string;
  pauseTime: string;
  text: string;
  copyService: boolean;
  copyServiceUUID: string;
  number: number;
  type: Type;
  toWho: string;
  lunch: boolean;
  hotMeal: boolean;
  createdAt: string;
}

const calculateDuration = (start: string, end: string): string => {
    const [startHours, startMinutes] = start.split(':').map(Number)
    const [endHours, endMinutes] = end.split(':').map(Number)

    const startTotalMinutes = startHours * 60 + startMinutes
    const endTotalMinutes = endHours * 60 + endMinutes

    let durationMinutes = endTotalMinutes - startTotalMinutes

    if (durationMinutes < 0) {
        durationMinutes += 24 * 60
    }

    const durationHours = Math.floor(durationMinutes / 60)
    const durationRemainderMinutes = durationMinutes % 60

    return `${String(durationHours).padStart(2, '0')}:${String(durationRemainderMinutes).padStart(2, '0')}`
}

const generateTimeOptions = () => {
    const options = []
    let currentTime = new Date()
    currentTime.setHours(6, 0, 0, 0)

    while (currentTime.getHours() !== 5 || currentTime.getMinutes() !== 45) {
        const hours = String(currentTime.getHours()).padStart(2, '0')
        const minutes = String(currentTime.getMinutes()).padStart(2, '0')
        options.push(`${hours}:${minutes}`)
        currentTime.setMinutes(currentTime.getMinutes() + 15)
    }

    options.push('05:45')

    return options
}

const generatePauseTimes = (): string[] => {
    const times = []
    let currentTime = new Date()
    currentTime.setHours(0, 0, 0, 0)

    while (currentTime.getHours() < 4 || (currentTime.getHours() === 4 && currentTime.getMinutes() === 0)) {
        const hours = String(currentTime.getHours()).padStart(2, '0')
        const minutes = String(currentTime.getMinutes()).padStart(2, '0')
        times.push(`${hours}:${minutes}`)
        currentTime.setMinutes(currentTime.getMinutes() + 15)
    }

    return times
}

const AddAgendaModal: FC<AddAgendaModalProps> = ({ isOpen, onClose, onAddAgenda, selectedType, selectedDate, agendaId }) => {
    const [error, setError] = useState<string | null>(null)
    const [typesOfServices, setTypesOfServices] = useState<ITypeOfService[]>([])
    const [users, setUsers] = useState<UserDTO[]>([])
    const [startTime, setStartTime] = useState<string>('06:00')
    const [endTime, setEndTime] = useState<string>('06:00')
    const [agenda, setAgenda] = useState<Agenda>()
    const [agendas, setAgendas] = useState<Agenda[]>([])
    const [repeatOption, setRepeatOption] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [selectedDeleteOption, setSelectedDeleteOption] = useState<string>('')
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [duration, setDuration] = useState<string>('')
    const timeOptions = generateTimeOptions()
    const pauseTimes = generatePauseTimes()

    const [formData, setFormData] = useState({
        _id: agendaId,
        dateTime: selectedDate,
        serviceDuration: duration,
        title: '',
        text: '',
        type: selectedType._id,
        toWho: '',
        typeOfService: '',
        startTime: '',
        endTime: '',
        pauseTime: '',
        copyService: false,
        copyServiceUUID: '',
        number: 0,
        lunch: false,
        hotMeal: false
    })

    useEffect(() => {
        if (agenda) {
            setFormData({
                _id: agenda._id,
                dateTime: agenda.dateTime,
                serviceDuration: calculateDuration(agenda.startTime, agenda.endTime),
                title: agenda.title,
                text: agenda.text,
                type: agenda.type._id,
                toWho: agenda.toWho,
                typeOfService: agenda.typeOfService,
                startTime: agenda.startTime,
                endTime: agenda.endTime,
                pauseTime: agenda.pauseTime,
                copyService: agenda.copyService,
                copyServiceUUID: agenda.copyServiceUUID,
                number: agenda.number,
                lunch: agenda.lunch,
                hotMeal: agenda.hotMeal
            })
        }
    }, [agenda])

    useEffect(() => {
        setDuration(calculateDuration(agenda ? agenda.startTime : startTime, agenda ? agenda.endTime : endTime))
    }, [formData.startTime, formData.endTime])

    useEffect(() => {
        setFormData({
            ...formData,
            dateTime: selectedDate
        })
    }, [selectedDate])

    useEffect(() => {
        const fetchAgenda = async () => {
            if (agendaId !== undefined) {
                try {
                    const response = await axios.get(`/api/agendas/${agendaId}`)
                    if (response.status === 200) {
                        setAgenda(response.data.data)
                    }
                    console.log(response.data.data)
                } catch (error) {
                    console.error('Failed to fetch agendas:', error)
                }
            } else {
                console.log('no Agenda ID')
            }
        }
        fetchAgenda()
    }, [agendaId])

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
        const fetchTypesOfServices = async () => {
            try {
                const response = await axios.get('/api/typeService')
                if (response.status === 200) {
                    setTypesOfServices(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch types of services:', error)
            }
        }
        fetchTypesOfServices()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/staff')
                if (response.status === 200) {
                    setUsers(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch users of services:', error)
            }
        }
        fetchUsers()
    }, [])

    const countHowManyShiftAreCopied = (uuid: string): Agenda[] => {
        return agendas?.filter((agenda) => agenda.copyServiceUUID === uuid) as Agenda[]
    }

    const handleRepeatChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRepeatOption(e.target.value)
    }

    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const isCheckbox = type === 'checkbox'
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: isCheckbox ? checked : value
        }))
    }

    const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value }

            if (updatedFormData.startTime && updatedFormData.endTime) {
                updatedFormData.serviceDuration = calculateDuration(updatedFormData.startTime, updatedFormData.endTime)
            }

            return updatedFormData
        })
    }

    const generateDatesForInterval = (startDate: string, endDate: string, interval: string) => {
        const dates = []
        let currentDate = moment(startDate)
        const end = moment(endDate)

        while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
            dates.push(currentDate.format('YYYY-MM-DD'))
            switch (interval) {
            case 'everyday':
                currentDate = currentDate.add(1, 'day')
                break
            case 'weekly':
                currentDate = currentDate.add(1, 'week')
                break
            case 'biweekly':
                currentDate = currentDate.add(2, 'weeks')
                break
            case 'triweekly':
                currentDate = currentDate.add(3, 'weeks')
                break
            case 'monthly':
                currentDate = currentDate.add(4, 'weeks')
                break
            default:
                break
            }
        }

        return dates
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        if (repeatOption && endDate) {
            const copyServiceUUID = uuidv4()
            const dates = generateDatesForInterval(selectedDate, endDate, repeatOption)
            const agendas = dates.map((date) => ({
                ...formData,
                dateTime: date,
                type: selectedType,
                copyServiceUUID: copyServiceUUID
            }))

            try {
                const response = await axios.post('/api/agendas/bulk', { agendas })
                if (response.status === 201) {
                    onAddAgenda({ ...response.data.data, type: selectedType })
                    onClose()
                }
                window.location.reload()
            } catch (error) {
                setError('Failed to add agenda. Please try again.')
                console.error('Failed to add agenda:', error)
            }
        } else {
            if (agendaId) {
                const editAgenda = { ...formData, type: selectedType }
                const response = await axios.put('/api/agendas', editAgenda)
                if (response.status === 200) {
                    onClose()
                }
            } else {
                try {
                    const newAgenda = { ...formData, type: selectedType }
                    const response = await axios.post('/api/agendas', newAgenda)
                    if (response.status === 201) {
                        onAddAgenda({ ...response.data.data, type: selectedType })
                        onClose()
                    }
                } catch (error) {
                    setError('Failed to add agenda. Please try again.')
                    console.error('Failed to add agenda:', error)
                }
            }
        }
    }

    const handleDeleteCopiedAgendas = async () => {
        onClose()
        const copiedAgendas = countHowManyShiftAreCopied(agenda?.copyServiceUUID as string)
        try {
            const response = await axios.delete('/api/agendas/deleteMany', {
                data: { agendas: copiedAgendas }
            })
            if (response.status === 200) {
                setAgendas((prevAgendas: Agenda[]) =>
                    prevAgendas.filter((agenda) =>
                        !copiedAgendas.some((a) => a._id === agenda._id)
                    )
                )
                window.location.reload()
            }
        } catch (error) {
            console.error('Failed to delete agendas:', error)
        }
    }

    const handleDeleteById = async (id: string) => {
        try {
            const response = await axios.delete(`/api/agendas/${id}`)
            if (response.status === 200) {
                setOpenConfirmModal(false)
                onClose()
                setAgendas((prevAgendas) =>
                    prevAgendas.filter((agenda) => agenda._id !== id)
                )
                window.location.reload()
            }
        } catch (error) {
            console.error('Failed to delete agenda:', error)
        }
    }

    if (!isOpen) return null

    const filteredTypesOfServices = typesOfServices.filter((service) =>
        service.linkedLayers.includes(selectedType._id)
    )

    const agendaUUID = countHowManyShiftAreCopied(agenda?.copyServiceUUID as string)

    if (openDeleteModal) {
        return (
            <div className='fixed top-1/2 left-[45%] bg-white shadow p-4 px-6 rounded'>
                <div className='flex gap-3 items-center'>
                    <input type="radio" name="deleteOption" value="single" onChange={() => setSelectedDeleteOption('single')} />
                    <div className='text-sm'>
                        <div>Only this one</div>
                        <div>1 shift is going to be deleted</div>
                    </div>
                </div>
                <div className='flex gap-3 items-center mt-2'>
                    <input type="radio" name="deleteOption" value="series" onChange={() => setSelectedDeleteOption('series')} />
                    <div className='text-sm'>
                        <div>Delete the whole series</div>
                        <div>{agendaUUID?.length} shifts are going to be deleted</div>
                    </div>
                </div>
                <div className='flex justify-between mt-3'>
                    <button
                        onClick={async () => {
                            if (selectedDeleteOption === 'single') {
                                setOpenDeleteModal(false)
                                setOpenConfirmModal(true)
                            } else if (selectedDeleteOption === 'series') {
                                await handleDeleteCopiedAgendas()
                                setOpenDeleteModal(false)
                            }
                        }}
                        className='bg-[#eb1e8d] p-2 rounded text-xs text-white'
                    >
            Delete
                    </button>
                    <button
                        className='bg-gray-200 p-2 text-xs rounded'
                        onClick={() => setOpenDeleteModal(false)}
                    >
            Cancel
                    </button>
                </div>
            </div>
        )
    }

    if (openConfirmModal) {
        return (
            <div className='fixed top-1/2 left-[45%] bg-white shadow p-4 px-6 rounded'>
                <p>Are you sure you want to delete this agenda?</p>
                <div className='flex justify-between mt-3'>
                    <button
                        onClick={() => handleDeleteById(agenda?._id as string)}
                        className='bg-[#eb1e8d] p-2 rounded text-xs text-white'
                    >
            Confirm
                    </button>
                    <button
                        className='bg-gray-200 p-2 text-xs rounded'
                        onClick={() => setOpenConfirmModal(false)}
                    >
            Cancel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg h-[85vh] relative overflow-y-scroll">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2">
                        <div className="py-2 px-4 rounded-md shadow-md" style={{ backgroundColor: selectedType.color }}>
                            <h2 className="text-white">{selectedType.name}</h2>
                        </div>
                        <div className="py-2 px-4 bg-gray-300 rounded-md text-white">
                            <p>{moment(selectedDate).format('ddd, D MMMM YYYY')}</p>
                        </div>
                    </div>
                    <div className='bg-gray-100 p-2 rounded flex flex-col gap-3'>
                        {selectedType.name !== 'Agenda' ? (
                            <div className='grid grid-cols-2'>
                                <label htmlFor="typeOfService" className='text-xs'>Type of Service</label>
                                <select name="typeOfService" value={formData.typeOfService} onChange={handleChange} className='p-1 rounded border'>
                                    <option value="">{agenda ? agenda.typeOfService : '------'}</option>
                                    {filteredTypesOfServices.map((t, index) => (
                                        <option key={index} value={t.name}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null }
                        <div className='grid grid-cols-2'>
                            <label className="block text-xs font-medium text-gray-700">Service duration</label>
                            <div className='text-sm'>
                                {calculateDuration(formData.startTime, formData.endTime)}
                            </div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <label htmlFor="startTime" className="block text-xs font-medium text-gray-700">Start Time</label>
                            <select
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleTimeChange}
                                className="px-2 py-1 rounded text-sm border-gray-300 border"
                            >
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2">
                            <label htmlFor="endTime" className="block text-xs font-medium text-gray-700">End Time</label>
                            <select
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleTimeChange}
                                className="px-2 py-1 rounded text-sm border-gray-300 border"
                            >
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedType.name !== 'Agenda' ? (
                            <div className="grid grid-cols-2">
                                <label htmlFor="pauseTime" className="block text-xs font-medium text-gray-700">Pause Time</label>
                                <select
                                    name="pauseTime"
                                    value={formData.pauseTime}
                                    onChange={handleChange}
                                    className="px-2 py-1 rounded text-sm border-gray-300 border"
                                >
                                    {pauseTimes.map((time, index) => (
                                        <option key={index} value={time} className="mb-1">{time}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                        {selectedType.name !== 'Agenda' ? (
                            <div className="grid grid-cols-2">
                                <label htmlFor="toWho" className="block text-xs font-medium text-gray-700">To Who</label>
                                <select
                                    name='toWho'
                                    value={formData.toWho}
                                    onChange={handleChange}
                                    className="px-2 py-1 rounded text-sm border-gray-300 border"
                                >
                                    <option value="" disabled>--------</option>
                                    {users.map((u: any, index) => (
                                        <option key={index} value={u.id} className="mb-1">{u.username}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                        {selectedType.name !== 'Agenda' ? (
                            <div className='flex'>
                                <label className="w-1/2 block text-xs font-medium text-gray-700">Lunch</label>
                                <input type="checkbox" name="lunch" checked={formData.lunch} onChange={handleChange} className="" />
                            </div>
                        ) : null}
                        {selectedType.name !== 'Agenda' ? (
                            <div className='flex'>
                                <label className="w-1/2 block text-xs font-medium text-gray-700">Hot meal</label>
                                <input type="checkbox" name="hotMeal" checked={formData.hotMeal} onChange={handleChange} className="" />
                            </div>
                        ) : null}
                        {selectedType.name === 'Agenda' ? (
                            <div className='grid grid-cols-2'>
                                <label className="k text-xs font-medium text-gray-700">Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} placeholder='' className="mt-1 text-xs p-1 w-full border-gray-300 rounded shadow-sm" />
                            </div>
                        ): null}
                        <div className='grid grid-cols-2'>
                            <label className="k text-xs font-medium text-gray-700">Comment</label>
                            <textarea name="text" value={formData.text} onChange={handleChange} placeholder='eg, dress code' rows={5} className="mt-1 text-xs p-1 w-full border-gray-300 rounded shadow-sm" />
                        </div>
                        <div className='flex'>
                            <label className="w-1/2 block text-xs font-medium text-gray-700">Copy service</label>
                            <input type="checkbox" name="copyService" checked={formData.copyService} onChange={handleChange} className="" />
                        </div>
                        {formData.copyService === true && (
                            <div>
                                <div className='flex'>
                                    <label className="w-1/2 block text-xs font-medium text-gray-700">To Repeat</label>
                                    <select className='px-2 py-1 rounded text-sm border-gray-300 border' name="repeatOption" value={repeatOption} onChange={handleRepeatChange}>
                                        <option value="">Select time interval</option>
                                        <option value="everyday">Every day</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Every 2 weeks</option>
                                        <option value="triweekly">Every 3 weeks</option>
                                        <option value="monthly">Every 4 weeks</option>
                                        <option value="specificDate">Specific date</option>
                                    </select>
                                </div>
                                <div className='flex'>
                                    <div className='w-1/2 block text-xs font-medium text-gray-700'>End Date</div>
                                    <input type="date" name="endDate" value={endDate} onChange={handleEndDateChange} className='p-1 rounded border-gray-300 border' />
                                </div>
                            </div>
                        )}
                        {selectedType.name !== 'Agenda' ? (
                            <div className='flex'>
                                <label className="w-1/2 block text-xs font-medium text-gray-700">Number</label>
                                <select name="number" value={formData.number} onChange={handleChange} className=' p-1 px-2 rounded'>
                                    {Array(20).fill(null).map((n, index) => (
                                        <option key={index} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                    </div> 
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <button type="submit" className="w-full py-2 text-sm px-4 bg-[#eb1e8d] text-white rounded hover:opacity-90">
                                {agendaId ? 'Update' : 'Add'}
                            </button>
                            {
                                agendaId && (
                                    <button
                                        className='bg-gray-300 p-2 rounded text-sm'
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            if (agenda?.copyServiceUUID) {
                                                setOpenDeleteModal(true)
                                            } else {
                                                setOpenConfirmModal(true)
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                )
                            }
                        </div>
                        <button
                            className='bg-gray-300 p-2 rounded text-sm'
                            type="button"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default AddAgendaModal
