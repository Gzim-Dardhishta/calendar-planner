import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BsPersonFillAdd } from 'react-icons/bs'

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        sex: '',
        martialStatus: '',
        contractType: '',
        contractDates: '',
        contractures: '',
        dutyDays: '',
        salary: '',
        conversionFactor: '',
        branch: '',
        payrollTaxCreadit: '',
        serivceMarketplaceOffers: '',
        selfMadeChanges: '',
        changeInPastShifts: '',
        hasSightInto: '',
        comments: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/users', formData)
            console.log(response.data)
            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    if (!isOpen) return null

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost"><BsPersonFillAdd size={26} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
            Make changes to your profile here. Click save when  done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input type="text" name={key} id="name" value={formData[key as keyof typeof formData]} onChange={handleChange} className="col-span-3" />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        // <div className=" flex items-center justify-center z-50 bg-black bg-opacity-50">
        //     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        //         <div className="flex justify-between items-center mb-4">
        //             <h2 className="text-xl font-semibold">Add New User</h2>
        //             <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
        //     &times;
        //             </button>
        //         </div>
        //         <form onSubmit={handleSubmit} className="space-y-4">
        //             {Object.keys(formData).map((key) => (
        //                 <div key={key}>
        //                     <label className="block text-sm font-medium text-gray-700">
        //                         {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
        //                     </label>
        //                     {key === 'contractDates' ? (
        //                         <input
        //                             type="text"
        //                             name={key}
        //                             value={formData[key as keyof typeof formData]}
        //                             onChange={handleChange}
        //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        //                             placeholder="Enter dates separated by commas (YYYY-MM-DD)"
        //                         />
        //                     ) : key === 'comments' ? (
        //                         <textarea
        //                             name={key}
        //                             value={formData[key as keyof typeof formData]}
        //                             onChange={handleChange}
        //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        //                             placeholder="Add comments here"
        //                         />
        //                     ) : (
        //                         <input
        //                             type="text"
        //                             name={key}
        //                             value={formData[key as keyof typeof formData]}
        //                             onChange={handleChange}
        //                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        //                         />
        //                     )}
        //                 </div>
        //             ))}
        //             <div className="flex justify-end">
        //                 <button
        //                     type="button"
        //                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        //                     onClick={onClose}
        //                 >
        //       Cancel
        //                 </button>
        //                 <button
        //                     type="submit"
        //                     className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        //                 >
        //       Submit
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    )
}

export default AddUserModal