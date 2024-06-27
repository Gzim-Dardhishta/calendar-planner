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
    dayNum: string
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

interface UserI {
    name: string;
    firstName: string;
    lastName?: string;
    email: string;
    username: string
    password: string;
    sex?: string;
    martialStatus?: string;
    contractType?: string;
    contractDates?: Date[];
    contractures?: string;
    dutyDays?: string;
    salary?: string;
    conversionFactor?: string;
    branch?: string;
    payrollTaxCredit?: string;
    serivceMarketplaceOffers?: string;
    selfMadeChanges?: string;
    changeInPastShifts?: string;
    hasSightInto?: string;
    comments?: string;
}

type StaffType = {
    staffList: UsersDTO[] | undefined
}

interface UserDTO {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    sex?: string;
    martialStatus?: string;
    contractType?: string;
    contractDates?: Date[];
    contractures?: string;
    dutyDays?: string;
    salary?: string;
    conversionFactor?: string;
    branch?: string;
    payrollTaxCredit?: string;
    serivceMarketplaceOffers?: string;
    selfMadeChanges?: string;
    changeInPastShifts?: string;
    hasSightInto?: string;
    comments?: string;
}

export interface AccountInfoI {
    user: UserDTO | undefined
}

export type CalendarType = {
    userList: UserDTO[] | undefined
}

interface Type {
    _id: string;
    name: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

interface Agenda {
    _id: string;
    dateTime: string;
    typeOfService: string;
    serviceDuration: string;
    startTime: string;
    endTime: string;
    pauseTime: string;
    text: string;
    copyService: boolean;
    number: number;
    type: Type;
    toWho: string;
    lunch: boolean;
    hotMeal: boolean;
    createdAt: string;
}