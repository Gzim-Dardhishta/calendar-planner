'use client'
import { FaCaretRight } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa'
import { FC, ReactNode, useEffect, useState } from 'react'
import { ResourcesNavLinks, UserProfileModalLinks } from '../Modals'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { UserDTO, UserI } from '@/ts'

interface IdType {
    id: string,
    username: string
}

const NavBar:FC = ():ReactNode => {

    const [users, setUsers] = useState<UserDTO[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/staff')
                if (response.status === 200) {
                    setUsers(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch user:', error)
            }
        }
        fetchUser()
    }, [])

    const getUserById = (userId: string | undefined) => {
        if (!users) {
            console.error('User list is undefined')
            return undefined
        }
        const user = users.find(user => user.id === userId)
        return user?.firstName
    }

    const getIdFromLocalStorage = () => {
        try {
            const id = localStorage.getItem('userId') as string
            return id
        } catch (error) {
            console.log('could not get the id')
        }
    }


    const [openLinks, setOpenLinks] = useState(false)
    const [openUserLinks, setOpenUserLinks] = useState(false)
    return (
        <div className='bg-gray-100 flex justify-between'>
            <div>
                <div onClick={() => setOpenLinks(!openLinks)} className='flex items-center gap-2 p-4 border-r border-gray-300 w-fit relative hover:cursor-pointer'>
                    <div>PLANNER</div>
                    <div><FaCaretRight /></div>
                </div>

                {openLinks && 
                    <div className='absolute top-14 left-8 border p-3 rounded-lg z-50 bg-white shadow-lg'>
                        <ResourcesNavLinks />
                    </div>
                }
            </div>

            <div>
                <div onClick={() => setOpenUserLinks(!openUserLinks)} className='flex items-center gap-5 p-4 border-l border-gray-300 w-fit relative'>
                    <div className='p-3 bg-white rounded-full'></div>
                
                    <div>
                        {getUserById(getIdFromLocalStorage())}
                    </div>
                    <div><FaCaretDown /></div>
                </div>

                {openUserLinks && 
                    <div className='absolute top-14 right-4 border p-3 rounded-lg z-50 bg-white shadow-lg'>
                        <UserProfileModalLinks />
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar