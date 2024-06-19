'use client'

import React, { FC, ReactNode } from 'react'
import { Button } from '../views'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Logout:FC = ():ReactNode => {

    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get('/api/auth/logout')
            router.push('/auth/login')
        } catch (error: any) {
            console.log(error.message)
            
        }

    }
    return (
        <Button text={'Logout'} color='white' classes='text-black p-1 ' onClick={logout} />
    )
}

export default Logout