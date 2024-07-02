'use server'

import { usersToUsersDTO } from '@/utils/DTOs'
import connectMongoDB from '@/libs/db'
import User from '@/models/User'
import { UserI } from '@/ts'

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

export const saveUser = async (userData: UserI) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            username,
            sex,
            role,
            martialStatus,
            contractType,
            contractDates,
            contractures,
            dutyDays,
            salary,
            conversionFactor,
            branch,
            payrollTaxCredit,
            serivceMarketplaceOffers,
            selfMadeChanges,
            changeInPastShifts,
            hasSightInto,
            comments
        } = userData
    
        const newUser = new User({
            name,
            lastName,
            email,
            password,
            username,
            sex,
            martialStatus,
            contractType,
            contractDates: {
                startDate: contractDates.startDate,
                endDate: contractDates.endDate ? contractDates.endDate : 'Not determined'
            },
            role,
            contractures,
            dutyDays,
            salary,
            conversionFactor,
            branch,
            payrollTaxCredit,
            serivceMarketplaceOffers,
            selfMadeChanges,
            changeInPastShifts,
            hasSightInto,
            comments
        })

        await newUser.save()

        return { message: 'User created successfully' }
    } catch (error) {
        console.error('Error creating user:', error)
        return { message: 'Error creating user' }
    }
}