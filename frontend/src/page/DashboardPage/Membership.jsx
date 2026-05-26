import React from 'react'
import JoinButton from '../../component/Personal/JoinButton'
import SubcriptionCard from '../../component/Personal/SubcriptionCard'

function Membership() {
    return (
        <div className='flex flex-col justify-center items-center max-md:items-start bg-main-background pb-36'>
            <h1 className='text-4xl text-left font-bold mb-2'
            data-aos="fade-right">
                Be Tirzz GYM Family using membership
            </h1>
            <span className='text-medium' data-aos="fade-right" data-aos-delay="200">
                Select the best membership plan based on your  preference
            </span>
            <div className='flex gap-10 w-full justify-center pt-15'>
                <div className='w-full gap-12 flex max-lg:flex-col items-center justify-evenly'>
                    <SubcriptionCard grow={4} price={"990.000"} time={"82k/month"} title={"Annual"}/>
                    <SubcriptionCard grow={3} price={"180.000"} time={"/month"} title={"Monthly"}/>
                    <SubcriptionCard grow={3} price={"380.000"} time={"126k/month"} title={"3 Month"}/>
                </div>
            </div>
        </div>
    )
}

export default Membership
