import React from 'react'
import AOS from 'aos'
function TransactionList({ transactions, index }) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    AOS.init()
    return (
        <div className='flex justify-between items-center py-4' data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
            <div className='flex justify-between flex-col gap-1'>
                <div className='flex flex-col mb-2'>
                    <span>{transactions.plan_name}</span>
                    <span className='text-xs text-medium'>{new Date(transactions.paid_at).toLocaleDateString('en-US', options)}</span>
                </div>
                <span className={`text-xs font-medium ${transactions.status === 'paid' ? 'text-green-500' : transactions.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}> {transactions.status.charAt(0).toUpperCase() + transactions.status.slice(1)}</span>
            </div>
            <span>{transactions.formatted_amount}</span>
        </div>
    )
}

export default TransactionList
