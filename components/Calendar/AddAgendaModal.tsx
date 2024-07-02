import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { ITypeOfService } from '../TypeOfServices/TypeOfServices'
import { EditAgendaType, UserDTO } from '@/ts'

interface AddAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgenda: (newAgenda: any) => void;
  selectedType: {_id: string; name: string; color: string };
  selectedDate: string;
  agendaId: string | undefined
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

    const [repeatOption, setRepeatOption] = useState<string>('')

    const [duration, setDuration] = useState<string>('')
    const timeOptions = generateTimeOptions()
    const pauseTimes = generatePauseTimes()

    const [formData, setFormData] = useState({
        _id: agendaId,
        dateTime: selectedDate,
        serviceDuration: duration,
        text: '',
        type: selectedType._id,
        toWho: '',
        typeOfService: '',
        startTime: '',
        endTime: '',
        pauseTime: '',
        copyService: false,
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
                text: agenda.text,
                type: agenda.type._id,
                toWho: agenda.toWho,
                typeOfService: agenda.typeOfService,
                startTime: agenda.startTime,
                endTime: agenda.endTime,
                pauseTime: agenda.pauseTime,
                copyService: agenda.copyService,
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
        const fetchAgendas = async () => {
            if(agendaId !== undefined) {
                try {
                    const response = await axios.get(`/api/agendas/${agendaId}`)
                    if (response.status === 200) {
                        setAgenda(response.data.data)
                    }
                } catch (error) {
                    console.error('Failed to fetch agendas:', error)
                }
            } else{
                console.log('no Agenda ID')
            }
        }
        fetchAgendas()
    }, [agendaId])

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

    const showUserById = (userId: string): string => {
        const user = users.find((user) => user.id === userId) as UserDTO
        return user.username
    }

    const handleRepeatChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRepeatOption(e.target.value)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const isCheckbox = type === 'checkbox'
        const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: isCheckbox ? checked : value
        }))
    }

    const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData, [name]: value }

            if (updatedFormData.startTime && updatedFormData.endTime) {
                updatedFormData.serviceDuration = calculateDuration(updatedFormData.startTime, updatedFormData.endTime)
            }

            return updatedFormData
        })
    }

    const generateDatesForMonth = (startDate: string) => {
        const dates = []
        let currentDate = moment(startDate)
        const endOfMonth = currentDate.clone().endOf('month')

        while (currentDate.isBefore(endOfMonth)) {
            dates.push(currentDate.format('YYYY-MM-DD'))
            currentDate = currentDate.add(1, 'day')
        }

        return dates
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        
        if(repeatOption === 'everyday') {
            const dates = generateDatesForMonth(selectedDate)
            const agendas = dates.map(date => ({
                ...formData,
                dateTime: date,
                type: selectedType
            }))

            try {
                const response = await axios.post('/api/agendas/bulk', { agendas })
                if (response.status === 201) {
                    // onAddAgenda(response.data.data)
                    onClose()
                }
            } catch (error) {
                setError('Failed to add agenda. Please try again.')
                console.error('Failed to add agenda:', error)
            }
        } else {
            if(agendaId) {
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

    if (!isOpen) return null

    const filteredTypesOfServices = typesOfServices.filter(service => service.linkedLayers.includes(selectedType._id)) 


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2">
                        <div className="py-2 px-4 rounded-md shadow-md" style={{ backgroundColor: selectedType.color }}>
                            <h2 className="text-white">{selectedType.name}</h2>
                        </div>
                        <div className="py-2 px-4 bg-gray-300 rounded-md text-white">
                            <p>{moment(selectedDate).format('dddd, MMMM Do YYYY')}</p>
                        </div>
                    </div>
                    <div>Add Service</div>
                    <div className='bg-gray-100 p-2 rounded flex flex-col gap-3'>
                        <div className='grid grid-cols-2'>
                            <label htmlFor="typeOfService" className='text-xs'>Type of Service</label>
                            <select name="typeOfService" value={formData.typeOfService} onChange={handleChange} className='p-1 rounded border'>
                                <option value="">{agenda ? agenda.typeOfService : '------'}</option>
                                {filteredTypesOfServices.map((t, index) => (
                                    <option key={index} value={t.name}>{t.name}</option>
                                ))}
                            </select>
                        </div>
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
                        <div className="grid grid-cols-2">
                            <label htmlFor="toWho" className="block text-xs font-medium text-gray-700">To Who</label>
                            <select
                                name='toWho'
                                value={formData.toWho}
                                onChange={handleChange}
                                className="px-2 py-1 rounded text-sm border-gray-300 border"
                            >
                                <option value="" disabled>--------</option>
                                {users.map((u:any, index) => (
                                    <option key={index} value={u.id} className="mb-1">{u.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex'>
                            <label className="w-1/2 block text-xs font-medium text-gray-700">Lunch</label>
                            <input type="checkbox" name="lunch" checked={formData.lunch} onChange={handleChange} className=""/>
                        </div>
                        <div className='flex'>
                            <label className="w-1/2 block text-xs font-medium text-gray-700">Hot meal</label>
                            <input type="checkbox" name="hotMeal" checked={formData.hotMeal} onChange={handleChange} className=""/>
                        </div>
                        <div className='grid grid-cols-2'>
                            <label className="k text-xs font-medium text-gray-700">Comment</label>
                            <textarea name="text" value={formData.text} onChange={handleChange} placeholder='eg, dress code' rows={5} className="mt-1 text-xs p-1 w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div className='flex'>
                            <label className="w-1/2 block text-xs font-medium text-gray-700">Copy service</label>
                            <input type="checkbox" name="copyService" checked={formData.copyService} onChange={handleChange} className=""/>
                        </div>
                        <div>
                            <label className="w-1/2 block text-xs font-medium text-gray-700">To Repeat</label>
                            <select name="repeatOption" value={repeatOption} onChange={handleRepeatChange}>
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
                            <label className="w-1/2 block text-xs font-medium text-gray-700">Number</label>
                            <select name="number" value={formData.number} onChange={handleChange} className=' p-1 px-2 rounded'>
                                {Array(20).fill(null).map((n, index) => (
                                    <option key={index} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2 text-sm px-4 bg-gray-400 text-white rounded hover:opacity-90">
                        {agendaId ? 'Update Agenda' : 'Add Agenda'}
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default AddAgendaModal
