import PublicLayout from '../layouts/PublicLayout'
import React, { FC, ReactNode } from 'react'
import StaffTable from './StaffTable'
import { StaffType } from '@/ts'

const Staff:FC<StaffType> = ({ staffList }):ReactNode => {
    return (
        <PublicLayout title='Staff'>
            <StaffTable staffList={staffList} />
        </PublicLayout>
    )
}

export default Staff