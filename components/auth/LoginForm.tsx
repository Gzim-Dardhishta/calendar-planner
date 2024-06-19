'use client'

import { Button, Input } from '@/components/views'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, ReactNode, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

interface IdType {
    id: string
}

const decodeToken = (token:string) => {
    try {
        const decodedToken = jwtDecode(token as string) as IdType
        console.log(decodeToken)

        localStorage.setItem('userId', decodedToken.id)
    } catch (error) {
        console.error('Error decoding JWT token:', error)
    }
}

const LogInForm:FC = ():ReactNode => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/auth/login', user) 

            decodeToken(response.data.token)

            router.push(`/calendar/${moment().year()}/${moment().month() + 1}`)
            
        } catch (error:any) {
            console.log('Login failed', error.message)
        }
    }

    
    return (
        <div className='flex justify-center'>
            <div className='border rounded-xl shadow p-6 py-7 mt-32'>
                <h4 className='text-2xl font-medium'>{loading ? 'Processing' : 'Login'}</h4>
                <p className='my-3 text-sm font-medium text-gray-400 mb-6'>Enter your email below to login to your account</p>

                <Input inputStyle='py-2 border-gray-300 bg-white' label='Email' type='email' value={user.email} setValue={(e:any) => setUser({...user, email: e.target.value})} placeholder='m@example.com' input='input' />

                <Input classes='mt-3' inputStyle='py-2 border-gray-300 bg-white' label='Password' type='password' value={user.password} setValue={(e:any) => setUser({...user, password: e.target.value})} placeholder='' input='input' />
                <Link href={'/'} className='text-xs font-medium hover:underline text-gray-500'>Forgot your password?</Link>

                <Button onClick={onLogin} text='Login' color='black' classes='text-sm text-white rounded-md font-medium w-full mt-5' />

                
                <div className='w-fit mx-auto text-sm mt-4 text-gray-600 font-medium'>Don&apos;t have an account? <Link className='underline' href={'/signup'}>Sign Up</Link></div>
            </div>
        </div>
    )
}

export default LogInForm