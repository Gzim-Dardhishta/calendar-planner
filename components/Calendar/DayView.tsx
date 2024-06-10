import { agendas, schedules, unproductive, available, unavailable } from '@/data'
import { Plan, PlansData } from '@/ts'
import moment, { Moment } from 'moment'
import Link from 'next/link'
import { BsPinAngleFill } from 'react-icons/bs'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdFileDownload } from 'react-icons/md'

const DayView = () => {

    const renderPlansForDay = (data: Plan[], bgColor: string) => {
        return (
            <div className='w-full'>
                {data.map((d, i) => (
                    <div key={i} className={`w-full ${bgColor} p-1 rounded mb-1 text-xs`}>
                        {moment(d.dateTime).format('MMM DD, YYYY')} - {moment(d.dateTime).format('hh:mm A')} - {d.text}
                    </div>
                ))}
            </div>
        )
    }

    const plansData: PlansData[] = [
        { label: 'AGENDAS', bgClass: 'bg-[#f0cd43]', listBgClass: 'bg-[#faecb0]', items: agendas },
        { label: 'SCHEDULE', bgClass: 'bg-[#E5320C]', listBgClass: 'bg-[#F5AD9E]', items: schedules },
        { label: 'UNPRODUCTIVE', bgClass: 'bg-[#ff4040]', listBgClass: 'bg-[#ffadac]', items: unproductive },
        { label: 'AVAILABLE', bgClass: 'bg-[#1ac673]', listBgClass: 'bg-[#9ff9cd]', items: available },
        { label: 'UNAVAILABLE', bgClass: 'bg-[#ff4040]', listBgClass: 'bg-[#ffadac]', items: unavailable }
    ]

    return (
        <div className='w-[80%] mx-auto'>
            <div className='flex items-center justify-between w-full mb-10'>
                {/* <div className='flex items-center gap-6'>
                    <div className='border rounded-md p-2 px-3 w-fit'><IoMenu size={'1.5em'} /></div>
                    <span>{selectedDate.format('MMMM YYYY')}</span>
                    <div className='flex items-center gap-4 border rounded-md w-fit px-4'>
                        <button className='' onClick={() => setSelectedDate(selectedDate.clone().subtract(1, 'month'))}><FaAngleLeft /></button>
                        <div className='border-x p-3'><FaRegCalendarAlt /></div>
                        <button className='' onClick={() => setSelectedDate(selectedDate.clone().add(1, 'month'))}><FaAngleRight /></button>
                    </div>
                    <div className='border px-5 py-2 rounded-md'>Today</div>
                </div> */}

                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-4 border rounded-md w-fit px-4 text-xs font-medium text-gray-600'>
                        <Link href='/day'>DAY</Link>
                        <Link href='/week' className='border-x p-[.9em]'>WEEK</Link>
                        <Link href='/calendar'>MONTH</Link> 
                    </div>

                    <div>
                        <select className='border rounded-md p-[.45em] w-36'>
                            <option value="">Staff view</option>
                            <option value="">Grid view</option>
                        </select>
                    </div>

                    <div className='p-[.6em] border rounded-md bg-gray-300'><HiDotsHorizontal /></div>

                    <div className='flex items-center gap-2 border bg-gray-300 p-2 px-3 text-sm rounded-md'>
                        <div className='rotate-180'><MdFileDownload /></div>
                        <span className='text-sm font-medium'>TO PUBLISH</span>
                    </div>

                    <div>
                        <BsPinAngleFill />
                    </div>
                </div>
            </div>
            {plansData.map((plan, index) => (
                <div key={index}>
                    <div className={`text-xs p-1 text-white mb-1 font-medium ${plan.bgClass}`}>
                        {plan.label}
                    </div>
                    <div className='border-b-2 mb-1'>
                        {renderPlansForDay(plan.items, plan.listBgClass)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DayView
