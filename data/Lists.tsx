import { Agenda, Plan } from '@/ts'
import { IoPerson } from 'react-icons/io5'

export const sampleAgendas: Agenda[] = [
    { dateTime: '2024-06-15T10:00:00', text: 'Meeting with John' },
    { dateTime: '2024-06-16T10:00:00', text: 'Meeting with John' },
    { dateTime: '2024-06-01T14:00:00', text: 'Lunch with Jane' },
    { dateTime: '2024-06-02T08:30:00', text: 'Coffee with Alice' },
    { dateTime: '2024-06-05T08:30:00', text: 'Coffee with Alice' },
    { dateTime: '2024-06-07T08:30:00', text: 'Coffee with Alice' },
    { dateTime: '2024-06-15T10:00:00', text: 'Meeting with John' },
    { dateTime: '2024-06-16T10:00:00', text: 'Meeting with John' },
    { dateTime: '2024-06-01T14:00:00', text: 'Lunch with Jane' },
    { dateTime: '2024-06-02T08:30:00', text: 'Coffee with Alice' },
    { dateTime: '2024-06-05T08:30:00', text: 'Coffee with Alice' },
    { dateTime: '2024-06-07T08:30:00', text: 'Coffee with Alice' }
]

export const sampleData: Record<string, Plan[]> = {
    AGENDA: [
        { dateTime: '2024-05-15T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-16T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-01T14:00:00', text: 'Lunch with Jane' },
        { dateTime: '2024-05-22T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-06T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-17T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-04-07T08:30:00', text: 'Coffee with Alice' }
    ],
    SCHEDULE_1: [
        { dateTime: '2024-05-15T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-16T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-01T14:00:00', text: 'Lunch with Jane' },
        { dateTime: '2024-05-02T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-06T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-17T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-04-07T08:30:00', text: 'Coffee with Alice' }
    ],
    UNPRODUCTIVE: [
        { dateTime: '2024-05-15T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-16T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-01T14:00:00', text: 'Lunch with Jane' },
        { dateTime: '2024-05-02T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-06T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-17T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-04-07T08:30:00', text: 'Coffee with Alice' }
    ],
    UNAVAILABLE: [
        { dateTime: '2024-05-15T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-16T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-16T10:00:00', text: 'Meeting with John' },
        { dateTime: '2024-05-01T14:00:00', text: 'Lunch with Jane' },
        { dateTime: '2024-05-02T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-06T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-05-17T08:30:00', text: 'Coffee with Alice' },
        { dateTime: '2024-04-07T08:30:00', text: 'Coffee with Alice' }
    ]
}

export const agendas: Plan[] = [
    { dateTime: '2024-05-20T10:00:00', text: 'Meeting with John' },
    { dateTime: '2024-05-20T12:00:00', text: 'Lunch with Jane' }
]

export const schedules: Plan[] = [
    { dateTime: '2024-05-20T14:00:00', text: 'Call with Alice' },
    { dateTime: '2024-05-20T16:00:00', text: 'Conference' }
]

export const unproductive: Plan[] = [
    { dateTime: '2024-05-20T17:00:00', text: 'Break' },
    { dateTime: '2024-05-20T18:00:00', text: 'Social Media' }
]

export const available: Plan[] = [
    { dateTime: '2024-05-20T19:00:00', text: 'Out of Office' },
    { dateTime: '2024-05-20T20:00:00', text: 'Unavailable' }
]

export const unavailable: Plan[] = [
    { dateTime: '2024-05-20T19:00:00', text: 'Out of Office' },
    { dateTime: '2024-05-20T20:00:00', text: 'Unavailable' }
]


export const office = [
    {
        title: 'Agenda Matters',
        links: [
            {
                text: 'Standart Schedule 1',
                link: '/'
            },
            {
                text: 'Standart Grid 1',
                link: '/'
            }
        ]
    },
    {
        title: 'Personnel administration',
        links: [
            {
                text: 'Self Sevice Portal',
                link: '/'
            },
            {
                text: 'Time Registration',
                link: '/'
            },
            {
                text: 'Statistics',
                link: '/'
            },
            {
                text: 'Enter Turnover',
                link: '/'
            },
            {
                text: 'Plus/Minus Hours',
                link: '/'
            },
            {
                text: 'Holiday Hours',
                link: '/'
            },
            {
                text: 'Close Month',
                link: '/'
            }
        ]
    },
    {
        title: 'Control & Safety',
        links: [
            {
                text: 'System Settings',
                link: '/'
            },
            {
                text: 'Functions',
                link: '/'
            },
            {
                text: 'National Holidays',
                link: '/'
            },
            {
                text: 'Password Settings',
                link: '/'
            },
            {
                text: 'Logbook',
                link: '/'
            },
            {
                text: 'Download Backup',
                link: '/'
            }
        ]
    },
    {
        title: 'Integrations',
        links: [
            {
                text: 'YoungOnes',
                link: '/'
            },
            {
                text: 'Yesplans',
                link: '/'
            },
            {
                text: 'Ticked booth',
                link: '/'
            },
            {
                text: 'NMBRS configuration',
                link: '/'
            }
        ]
    }
]

export const staff = [
    {
        id: 1,
        photo: <IoPerson />,
        firstName: 'Liridon',
        lastName: 'Gashi',
        email: 'liridon@gmail.com',
        phone: '123456789',
        function: 'Contact Owner'
    },
    {
        id: 1,
        photo: <IoPerson />,
        firstName: 'Liridon',
        lastName: 'Gashi',
        email: 'liridon@gmail.com',
        phone: '123456789',
        function: 'Contact Owner'
    },
    {
        id: 1,
        photo: <IoPerson />,
        firstName: 'Liridon',
        lastName: 'Gashi',
        email: 'liridon@gmail.com',
        phone: '123456789',
        function: 'Contact Owner'
    },
    {
        id: 1,
        photo: <IoPerson />,
        firstName: 'Liridon',
        lastName: 'Gashi',
        email: 'liridon@gmail.com',
        phone: '123456789',
        function: 'Contact Owner'
    }
]