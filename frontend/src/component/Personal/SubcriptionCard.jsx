import React from 'react'
import JoinButton from '../Personal/JoinButton'

function SubcriptionCard({ grow, price, time, title }) {
    return (
        <div className={`flex flex-col rounded-lg justify-between shadow-[0_0_0_1px_rgba(225,225,225,.1)] px-5 py-8 h-80 col-span-3 w-full items-center`}>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <div className='flex flex-col items-center gap-2'>
                <span className='text-3xl font-semibold'>Rp.{price}</span>
                <span className='text-medium text-xs'>{time}</span>
            </div>
            <JoinButton />
        </div>
    )
}

export default SubcriptionCard
