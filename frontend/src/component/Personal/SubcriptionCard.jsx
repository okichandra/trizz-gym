import React from 'react'
import JoinButton from '../Personal/JoinButton'
import Star from '../../assets/star.svg'
import AOS from 'aos'
import 'aos/dist/aos.css'

function SubcriptionCard({ grow, price, time, title }) {
    AOS.init()
    return (
        <div
            className={`flex flex-col rounded-lg justify-between shadow-[0_0_0_1px_rgba(225,225,225,.1)] px-5 py-8 h-80 col-span-3 w-full max-w-lg items-center`}
            data-aos="fade-up"
            data-aos-delay="300"
        // data-aos-anchor-placement="top-bottom"
        >
            <div className='w-full bg-linear-to-tl from-violet-900 to-purple-600 px-4 pt-4 pb-6 rounded-lg'>
                <div className='flex justify-between'>
                    <img src={Star} alt="star" className='w-6' />
                    <span className='font-extralight text-xs bg-purple-400/15 px-3 py-1 rounded-2xl'>Best deals</span>
                </div>
                <span className="text-xs mt-1">{title}</span>
                <div>
                    <span className="text-lg font-medium">Rp {price}</span>
                    <span className="text-xs  font-thin">{time}</span>
                </div>
            </div>

            <div className="plan-benefits ">

            </div>
            <JoinButton />
        </div>
    )
}

export default SubcriptionCard
