import React, { useEffect, useState } from 'react'
import { getMembershipPlans } from "../../api/membership"
import SubcriptionCard from '../../component/Personal/SubcriptionCard'

function Membership() {
    const [plans, setPlans] = useState([])


    useEffect(() => {
        getMembershipPlans()
            .then(data => {
                setPlans(data)
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <div className='flex flex-col items-center max-md:items-start bg-main-background pb-36 min-h-screen md:overflow-hidden'>
            <h1
                className='text-3xl text-left font-bold mb-2'
                data-aos="fade-right"
            >
                Be Tirzz GYM Family using membership
            </h1>

            <span
                className='text-medium'
                data-aos="fade-right"
                data-aos-delay="200"
            >
                Select the best membership plan based on your preference
            </span>

            <div className='flex w-full justify-center pt-15'>
                <div className='w-full gap-12 flex max-lg:flex-col items-center md:items-start justify-evenly'>

                    {plans.toReversed().map(plan => (
                        <SubcriptionCard
                            key={plan.id}
                            plan={plan}
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Membership