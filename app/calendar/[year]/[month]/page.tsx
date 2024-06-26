import { Calendar } from '@/components/Calendar'
import { getAllUsers } from '@/utils/actions/users'
import React, { FC, ReactNode } from 'react'

const CalendarPage:FC = async () => {


    const users = await getAllUsers()

    return (
        <>
            <Calendar userList={users} />
        </>
    )
}

export default CalendarPage