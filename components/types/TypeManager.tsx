'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import PublicLayout from '../layouts/PublicLayout';
interface IType {
  _id?: string;
  name: string;
  color: string;
}

const TypeManager = () => {
  const [types, setTypes] = useState<IType[]>([]);
  const [formData, setFormData] = useState<IType>({ name: '', color: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('/api/types');
        if (response.status === 200) {
          setTypes(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch types:', error);
      }
    };
    fetchTypes();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (formData._id) {
        const response = await axios.put('/api/types', formData);
        if (response.status === 200) {
          setTypes(types.map(type => type._id === formData._id ? response.data.data : type));
        }
      } else {
        const response = await axios.post('/api/types', formData);
        if (response.status === 201) {
          setTypes([...types, response.data.data]);
        }
      }
      setFormData({ name: '', color: '' });
      setIsModalOpen(false);
    } catch (error) {
      setError('Failed to save type. Please try again.');
      console.error('Failed to save type:', error);
    }
  };

  const handleEdit = (type: IType) => {
    setFormData(type);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete('/api/types', { data: { _id: id } });
      if (response.status === 200) {
        setTypes(types.filter(type => type._id !== id));
      }
    } catch (error) {
      setError('Failed to delete type. Please try again.');
      console.error('Failed to delete type:', error);
    }
  };

  return (
    <PublicLayout title='Calendar'>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Types</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add Type
      </button>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {types.map((type) => (
              <tr key={type._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{type.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-6 w-6 rounded-full" style={{ backgroundColor: type.color }}></div>
                </td>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input type="color" name="color" value={formData.color} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {formData._id ? 'Update Type' : 'Add Type'}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
    </PublicLayout>
  );
};

export default TypeManager;
