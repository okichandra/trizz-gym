import { React, useEffect, useState } from 'react'
import TransactionList from '../../component/Personal/TransactionList'
import { getTransactions } from '../../api/transactionService'
import AOS from 'aos'
function Transaction() {
    const [transactions, setTransactions] = useState([])

    const user = JSON.parse(
        localStorage.getItem("user")
    )
    useEffect(() => {
        getTransactions(user.id)
            .then(data => {
                setTransactions(data.transactions)
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <div className='w-full min-h-screen h-full flex flex-col gap-12'>
            <h1 className='text-4xl font-bold' data-aos="fade-right">Transaction history</h1>
            <div>
                {
                    transactions.map(transaction => (
                        <TransactionList
                            key={transaction.id}
                            transactions={transaction}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Transaction
