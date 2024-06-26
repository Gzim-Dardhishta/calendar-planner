'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import PublicLayout from '../layouts/PublicLayout'

export interface ITypeOfService {
    _id?: string;
    name: string;
    category: string;
    linkedLayers: string[]; // Correctly typed as array of strings
}

const TypeOfServices = () => {
    const [typesOfServices, setTypesOfServices] = useState<ITypeOfService[]>([])
    const [formData, setFormData] = useState<ITypeOfService>({ name: '', category: '', linkedLayers: [] })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [types, setTypes] = useState([]) // Adjusted type for simplicity

    useEffect(() => {
        const fetchTypesOfServices = async () => {
            try {
                const response = await axios.get('/api/typeService')
                if (response.status === 200) {
                    console.log(response.data.data)
                    setTypesOfServices(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch types of services:', error)
            }
        }
        fetchTypesOfServices()
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

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        console.log(value)
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        const selectedLayerId = value

        let updatedLayers: string[]

        if (checked) {
            updatedLayers = [...formData.linkedLayers, selectedLayerId]
        } else {
            updatedLayers = formData.linkedLayers.filter(layerId => layerId !== selectedLayerId)
        }

        setFormData({
            ...formData,
            linkedLayers: updatedLayers
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            if (formData._id) {
                const response = await axios.put('/api/typeService', formData)
                if (response.status === 200) {
                    setTypesOfServices(typesOfServices.map(type => type._id === formData._id ? response.data.data : type))
                }
            } else {
                const response = await axios.post('/api/typeService', formData)
                if (response.status === 201) {
                    setTypesOfServices([...typesOfServices, response.data.data])
                }
            }
            setFormData({ name: '', category: '', linkedLayers: [] })
            setIsModalOpen(false)
        } catch (error) {
            setError('Failed to save type. Please try again.')
            console.error('Failed to save type:', error)
        }
    }

    const handleEdit = (type: ITypeOfService) => {
        setFormData(type)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete('/api/types', { data: { _id: id } })
            if (response.status === 200) {
                setTypesOfServices(typesOfServices.filter(type => type._id !== id))
            }
        } catch (error) {
            setError('Failed to delete type. Please try again.')
            console.error('Failed to delete type:', error)
        }
    }

    return (
        <PublicLayout title='Type of Service'>
            <div className="container mx-auto p-24 px-16 flex gap-8">
                <div className='w-1/4 flex flex-col gap-4 border-r'>
                    <Link href='/ssp/branchlayers'>Branch Layer</Link>
                    <Link href='/ssp/branchlayers/shifttypes'>Types of Services</Link>
                </div>
                <div className='w-full'>
                    <h1 className="text-2xl font-bold mb-4">Manage Types of Services</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Add
                    </button>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Linked layers</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {typesOfServices.map((type) => (
                                    <tr key={type._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {type.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.linkedLayers.join(', ')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(type)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(type._id!)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className='w-full p-2 border rounded'>
                                        <option value="Productive">Productive</option>
                                        <option value="SpecialLeave">Special Leave</option>
                                        <option value="UnpaidLeave">Unpaid Leave</option>
                                        <option value="UnProductive">UnProductive (other)</option>
                                        <option value="n/a">n/a</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Linked Layers</label>
                                    {types.map((type: { _id: string; name: string}, index) => (
                                        <div key={index} className='flex items-center gap-2 justify-start'>
                                            <input
                                                type="checkbox"
                                                name="linkedLayers"
                                                value={type._id}
                                                checked={formData.linkedLayers.includes(type._id)}
                                                onChange={handleCheckChange}
                                                className="mt-1"
                                            />
                                            <div>{type.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    {formData._id ? 'Update' : 'Add'}
                                </button>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    )
}

export default TypeOfServices