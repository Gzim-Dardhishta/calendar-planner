'use server'

import { UserI } from '@/ts'
import React, { FC } from 'react'
import { Button } from '../ui/button'
import { saveUser } from '@/utils/actions/users'

interface SaveUserDataType {
    userData: UserI
}

const SaveUserData:FC<SaveUserDataType> = ({userData}) => {
    return (
        <Button onClick={async () => {
            await saveUser(userData)
        }}>Save</Button>
    )
}

export default SaveUserData