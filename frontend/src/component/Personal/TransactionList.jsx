import React from 'react'
import AOS from 'aos'
function TransactionList({ transactions }) {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    AOS.init()
    console.log(transactions.status)
    return (
        <div className='flex justify-between items-center py-4 border-b border-gray-300' data-aos="fade-up">
            <div className='flex justify-between flex-col gap-1'>
                <span>{transactions.membership.plan.name}</span>
                <span className='text-xs text-medium'>{new Date(transactions.paid_at).toLocaleDateString('en-US', options)}</span>
                <span className={`text-xs font-medium ${transactions.status === 'success' ? 'text-green-500' : transactions.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}> {transactions.status.charAt(0).toUpperCase() + transactions.status.slice(1)}</span>
            </div>
            <span>Rp {Number(transactions.amount).toLocaleString('id-ID')}</span>
        </div>
    )
}

export default TransactionList
