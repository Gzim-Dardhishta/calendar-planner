import { Calendari } from '@/components/Calendar'
import { getAllUsers } from '@/utils/actions/users'
import React, { FC, ReactNode } from 'react'

const CalendarPage:FC = async () => {

    return (
        <>
            <Calendari />
        </>
    )
}

export default CalendarPage