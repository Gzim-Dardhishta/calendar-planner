import { StaffType } from '@/ts'
import React, { FC } from 'react'
import { MdEmail } from 'react-icons/md'
import { TfiPrinter } from 'react-icons/tfi'
import { BsPersonFillAdd } from 'react-icons/bs'
import { BsFillPeopleFill } from 'react-icons/bs'

const StaffTable:FC<StaffType> = ({staffList}) => {

    return (
        <div>

            <div className='flex items-canter justify-between my-10 m-16'>
                <div className='flex items-canter gap-10'>
                    <h4>Staff</h4>
                    <div>
                        <input type="text" className='border rounded-lg p-2 py-1' placeholder='Search...' />
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <div className='cursor-pointer'>
                        <MdEmail size={26} />
                    </div>
                    <div className='cursor-pointer'>
                        <TfiPrinter size={26} />
                    </div>
                    <div className='cursor-pointer'>
                        <BsPersonFillAdd size={26} />
                    </div>
                    <div className='cursor-pointer'>
                        <BsFillPeopleFill size={26} />
                    </div>
                    <div className='cursor-pointer'>
                        <TfiPrinter size={26} />
                    </div>
                </div>
            </div>


            <div className='px-16'>
                <table className='border w-full'>
                    <thead>
                        <tr className=' border-b'>
                            <th><input type="checkbox" name="" id="" /></th>
                            <th>photo</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList!.length > 0 && staffList!.map((s, index) => (
                            <tr key={index} className='divide-x hover:bg-gray-100 duration-200 ease-in-out cursor-pointer'>
                                <td ><input className='' type="checkbox" name="" id="" /></td>
                                <td className=''>{s.photo}</td>
                                <td className='p-3 py-4'>{s.firstName}</td>
                                <td className='p-3 py-4'>{s.lastName}</td>
                                <td className='p-3 py-4'>{s.email}</td>
                                <td className='p-3 py-4'>{s.phone}</td>
                                <td className='p-3 py-4'>{s.function}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default StaffTable