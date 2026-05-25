import React from 'react'
import JoinButton from '../../component/Personal/JoinButton'
import SubcriptionCard from '../../component/Personal/SubcriptionCard'

function Membership() {
    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='text-4xl font-bold mb-2'>
                Be Tirzz GYM Family using membership
            </h1>
            <span className='text-medium'>
                Select the best plan based on your needs
            </span>
            <div className='flex gap-10 w-full justify-center pt-15'>
                <div className='w-full gap-5 px-30 flex justify-evenly'>
                    <SubcriptionCard grow={3} price={"180.000"} time={"/month"} title={"Monthly"}/>
                    <SubcriptionCard grow={4} price={"990.000"} time={"82k/month"} title={"Annual"}/>
                    <SubcriptionCard grow={3} price={"380.000"} time={"126k/month"} title={"3 Month"}/>
                </div>
            </div>
        </div>
    )
}

export default Membership
