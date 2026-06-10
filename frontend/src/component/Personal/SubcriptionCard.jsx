import React from 'react'
import JoinButton from '../Personal/JoinButton'
import Star from '../../assets/star.svg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import CorrectIcon from '../../assets/correct-icon.svg'
import Benefits from './Benefits'
import BorderGlow from '../ReactBitz/BorderGlow'

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
        <div data-aos="fade-up" className="w-full">
            <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                className='w-full'
            >
                <div className={`flex flex-col rounded-lg justify-between px-5 py-8 h-full col-span-3 w-full max-w-lg items-start gap-5`}>
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

                    <Benefits benefits={benefits} />
                    <JoinButton plan={plan} />
                </div>
            </BorderGlow>
        </div>
    )
}

export default SubcriptionCard
