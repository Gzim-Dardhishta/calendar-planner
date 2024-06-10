import { FC, ReactNode } from 'react'
import { IoPerson } from 'react-icons/io5'

const UserProfileModalLinks:FC = ():ReactNode => {
    return (
        <>
            <div className='flex flex-col gap-3 p-2'>
                <div className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>My Account</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>Subscription</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>Support</div>
                </div>
                <div className='flex items-center gap-2'>
                    <div><IoPerson /></div>
                    <div>Log Out</div>
                </div>
            </div>
        </>
    )
}

export default UserProfileModalLinks