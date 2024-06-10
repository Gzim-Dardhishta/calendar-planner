import { UserDTO } from '@/ts'

export const usersToUsersDTO = (user:any) => {
    const userDTO: UserDTO = {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        photo: user.photo,
        function: user.function
    }
    return userDTO
}