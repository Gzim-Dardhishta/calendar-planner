import React, { FC } from 'react'

interface SelectTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  types: { name: string; color: string }[];
  onSelectType: (type: { name: string; color: string }) => void;
}

const SelectTypeModal: FC<SelectTypeModalProps> = ({ isOpen, onClose, types, onSelectType }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Select Type</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {types.map((type, index) => (
                            <div key={index} className="py-2 px-4 rounded-md shadow-md cursor-pointer" style={{ backgroundColor: type.color }} onClick={() => onSelectType(type)}>
                                <h3 className="text-white">{type.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectTypeModal
