import PublicLayout from '../layouts/PublicLayout'
import React, { FC, ReactNode } from 'react'
import StaffTable from './StaffTable'

const Staff:FC = ():ReactNode => {
    return (
        <PublicLayout title='Staff'>
            <StaffTable />
        </PublicLayout>
    )
}

export default Staff