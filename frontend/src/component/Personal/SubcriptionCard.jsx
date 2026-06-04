import React from 'react'
import JoinButton from '../Personal/JoinButton'
import Star from '../../assets/star.svg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import CorrectIcon from '../../assets/correct-icon.svg'

function SubcriptionCard({ plan }) {
    const {
        name,
        sale_price,
        display_monthly_price,
        original_price,
        badge,
        benefits
    } = plan
    AOS.init()
    return (
        <div
            className={`flex flex-col rounded-lg justify-between shadow-[0_0_0_1px_rgba(225,225,225,.1)] px-5 py-8 h-full col-span-3 w-full max-w-lg items-start gap-5`}
            data-aos="fade-up"
        // data-aos-anchor-placement="top-bottom"
        >
            <div className='w-full bg-linear-to-tl from-violet-900 to-purple-600 px-4 pt-4 pb-6 rounded-lg'>
                <div className='flex justify-between'>
                    <img src={Star} alt="star" className='w-6' />
                    <span className='font-extralight text-xs bg-purple-400/15 px-3 py-1 rounded-2xl'>{badge}</span>
                </div>
                <span className="text-xs mt-1">{name}</span>
                <div>
                    <span className="text-lg font-medium">Rp {Number(display_monthly_price).toLocaleString('id-ID')}</span>
                    <span className="text-xs  font-thin">/month</span>
                </div>
            </div>

            <div className="plan-benefits mt-4">
                {benefits?.map(benefit => (
                    <div
                        key={benefit.id}
                        className="text-sm py-1"
                    >
                        <img src={CorrectIcon} alt="correct" className="w-4 mr-2 inline" />
                        {benefit.benefit_text}
                    </div>
                ))}
            </div>
            <JoinButton />
        </div>
    )
}

export default SubcriptionCard
