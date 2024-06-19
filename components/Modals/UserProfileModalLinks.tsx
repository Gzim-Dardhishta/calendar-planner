import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { IoPerson } from 'react-icons/io5'
import { TbLogout2 } from 'react-icons/tb'
import { Logout } from '../auth'

const UserProfileModalLinks:FC = ():ReactNode => {
    return (
        <>
            <div className='flex flex-col gap-3 p-2'>
                <Link href={`/staff/${localStorage.getItem('userId')}`} className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>My Account</div>
                </Link>
                {/* <div className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>Subscription</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>Support</div>
                </div> */}
                <div className='flex items-center gap-2'>
                    <div><TbLogout2 /></div>
                    <Logout />
                </div>
            </div>
        </>
    )
}

export default UserProfileModalLinks