import { Calendari } from '@/components/Calendar'
import { getAllUsers } from '@/utils/actions/users'
import React, { FC, ReactNode } from 'react'

const CalendarPage:FC = async () => {


    const users = await getAllUsers()

    return (
        <>
            <Calendari userList={users} />
        </>
    )
}

export default CalendarPage