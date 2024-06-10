import { AccountInfo } from '@/components/User'
import { UserDTO } from '@/ts'
import { getUserById } from '@/utils/actions/users'
import React from 'react'

const UserPage = async ({ params }: any) => {

    const user:UserDTO | undefined = await getUserById(params.id)

    return (
        <div>
            <AccountInfo user={user} />
        </div>
    )
}

export default UserPage