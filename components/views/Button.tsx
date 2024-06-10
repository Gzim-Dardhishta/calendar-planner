import React, { FC, ReactNode } from 'react'
import { ButtonType } from '@/ts'

const Button:FC<ButtonType> = (props): ReactNode => {

    const {
        text,
        color,
        onClick,
        classes
    } = props

    return (
        <button className={`px-4 py-2 text-white rounded-md hover:opacity-80 duration-200 ease-in-out ${classes}`} style={{backgroundColor: `${color}`}}  onClick={onClick}>
            {text}
        </button>
    )
}

export default Button