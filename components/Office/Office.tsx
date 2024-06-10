import { office } from '@/data'
import PublicLayout from '../layouts/PublicLayout'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

const Office:FC = ():ReactNode => {
    return (
        <PublicLayout title='Office'>
            <div className='flex gap-14 flex-wrap w-[75%] mx-auto mt-14'>
                {office.map((o, index) => (
                    <div key={index} className='border rounded-xl shadow-xl w-[30%] '>
                        <h4 className='border-b text-center font-medium px-5 py-3 text-gray-700'>{o.title}</h4>
                        <div className='text-xs divide-y p-5 py-1'>
                            {o.links.map((l, i) => (
                                <div key={i} className='py-2'>
                                    <Link href={l.link}>{l.text}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PublicLayout>
    )
}

export default Office