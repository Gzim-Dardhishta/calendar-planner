export type InputTypes = {
    placeholder: string
    value: string
    setValue: any
    label?: string
    classes?: string
    type: string
    input: 'input' | 'textarea'
    rows?: number,
    inputStyle?: string
}

type Agenda = {
    dateTime: string
    text: string
}

type Plan = {
    dateTime: string
    text: string
}
  
type Day = {
    day: string
    date: string
    fullDate: string
    isCurrentWeek: boolean
}

type Plan = {
    dateTime: string
    text: string
}
  
type PlansData = {
    label: string
    bgClass: string
    listBgClass: string
    items: Plan[]
}

export type ProfileLayoutTypes = {
    children: any
    title: string
}

export type ButtonType = { 
    text: string,
    color: string,
    onClick: () => void,
    classes?: string
}

type UserType = {
    username: string;
    email: string;
    password: string;
}

type StaffType = {
    staffList: UsersDTO[] | undefined
}

export interface UserDTO {
    id: string
    photo: string
    firstName: string
    lastName: string
    phone: number
    username: string
    email: string
    function: string
}

export interface AccountInfoI {
    user: UserDTO | undefined
}