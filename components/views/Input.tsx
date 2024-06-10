'use client'
import { InputTypes } from '@/ts'
import { FC, ReactNode } from 'react'

const Input:FC<InputTypes> = (props): ReactNode => {
    const { 
        value, 
        setValue, 
        placeholder, 
        label, 
        classes, 
        type, 
        input, 
        rows,
        inputStyle
    } = props

    return (
        <div className={`relative w-full flex items-start flex-col ${classes}`}>
            {label && (
                <label className=" text-gray-600 font-medium text-sm mb-[.35em]">
                    {label}
                </label>
            )}

            {input === 'textarea' &&
                <textarea
                    className="block w-full p-2.5 focus:border-[var(--input-select-state)] hover:border-[var(--input-hover-state)] text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 transition-all ease-in-out duration-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={setValue}
                    rows={rows}
                />
            }

            {input === 'input' && 
                <input
                    type={type}
                    className={`block w-full p-2.5 focus:border-[var(--input-select-state)] hover:border-[var(--input-hover-state)] text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 transition-all ease-in-out duration-500 ${inputStyle}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={setValue}
                />
            }
        </div>
    )
}

export default Input
