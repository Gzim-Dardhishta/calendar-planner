import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface AddAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAgenda: (newAgenda: any) => void;
  selectedType: { name: string; color: string };
}

const AddAgendaModal: FC<AddAgendaModalProps> = ({ isOpen, onClose, onAddAgenda, selectedType }) => {
  const [formData, setFormData] = useState({
    dateTime: '',
    text: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Sigurohuni që të dërgoni të gjitha informacionet e tipit
      const newAgenda = { ...formData, type: selectedType };
      const response = await axios.post('/api/agendas', newAgenda);
      if (response.status === 201) {
        // Përditësoni gjendjen duke përfshirë ngjyrën e duhur
        onAddAgenda({ ...response.data.data, type: selectedType });
        onClose();
      }
    } catch (error) {
      setError('Failed to add agenda. Please try again.');
      console.error('Failed to add agenda:', error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date and Time</label>
            <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <textarea name="text" value={formData.text} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <div className="py-2 px-4 rounded-md shadow-md" style={{ backgroundColor: selectedType.color }}>
              {selectedType.name}
            </div>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Agenda
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddAgendaModal;
