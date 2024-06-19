import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment' // Sigurohemi që moment është importuar këtu

interface AddAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgenda: (newAgenda: any) => void;
  selectedType: { name: string; color: string };
  selectedDate: string;
}

const AddAgendaModal: FC<AddAgendaModalProps> = ({ isOpen, onClose, onAddAgenda, selectedType, selectedDate }) => {
    const [formData, setFormData] = useState({
        dateTime: selectedDate,
        text: ''
    })
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setFormData({
            ...formData,
            dateTime: selectedDate
        })
    }, [selectedDate])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const [hours, minutes] = value.split(':')
        const dateTime = moment(selectedDate).set({ hours: Number(hours), minutes: Number(minutes) }).format('YYYY-MM-DDTHH:mm')
        setFormData({ ...formData, dateTime })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
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

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="py-2 px-4 rounded-md shadow-md" style={{ backgroundColor: selectedType.color }}>
                            <h2 className="text-white">{selectedType.name}</h2>
                        </div>
                        <div className="py-2 px-4 bg-yellow-400 rounded-md text-white">
                            <p>{moment(selectedDate).format('dddd, MMMM Do YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input type="time" name="time" onChange={handleTimeChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Text</label>
                        <textarea name="text" value={formData.text} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Agenda
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default AddAgendaModal
