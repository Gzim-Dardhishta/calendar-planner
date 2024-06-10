'use server'

import { Staff } from '@/components/Satff'
import { getAllUsers } from '@/utils/actions/users'
import React from 'react'

const SatffPage = async () => {

    const data = await getAllUsers()

    return (
        <>
            <Staff staffList={data} />
        </>
    )
}

export default SatffPage