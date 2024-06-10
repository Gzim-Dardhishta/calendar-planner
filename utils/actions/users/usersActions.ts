'use server'

import { usersToUsersDTO } from '@/utils/DTOs'
import connectMongoDB from '@/libs/db'
import User from '@/models/User'
import { UserDTO } from '@/ts'

export const getAllUsers = async () => {
    try {
        await connectMongoDB()
        const users = await User.find()

        const usersDTO = users.map((user) => usersToUsersDTO(user))

        return usersDTO
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (id:string)  => {
    try {
        await connectMongoDB()
        const user = await User.findById(id)

        const userDTO = usersToUsersDTO(user)

        return userDTO
    } catch (error) {
        console.log(error)
    }
}