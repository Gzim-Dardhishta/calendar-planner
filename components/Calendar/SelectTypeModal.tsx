import React, { FC } from 'react';

interface SelectTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  types: { name: string; color: string }[];
  onSelectType: (type: { name: string; color: string }) => void;
}

const SelectTypeModal: FC<SelectTypeModalProps> = ({ isOpen, onClose, types, onSelectType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
        <h2 className="text-lg font-bold mb-4">Select Type</h2>
        <div className="grid grid-cols-1 gap-4">
          {types.map((type) => (
            <button
              key={type.name}
              onClick={() => onSelectType(type)}
              className="py-2 px-4 rounded-md shadow-md"
              style={{ backgroundColor: type.color }}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTypeModal;
