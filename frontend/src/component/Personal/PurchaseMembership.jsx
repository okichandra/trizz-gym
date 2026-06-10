import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from '../../api/config'
import StarIcon from '../../assets/star.svg'
import ShinyText from '../../component/ReactBitz/ShinyText'
import Benefits from './Benefits';
import PurchaseButton from './PurchaseButton'
import Aos from 'aos';

function PurchaseMembership() {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const fetchPlan = async () => {
            const response = await fetch(
                `${API_URL}/membership-plans/${planId}`
            );

            const data = await response.json();

            if (data.success) {
                setPlan(data.plan);
            }
        };

        fetchPlan();
    }, [planId]);
    return (
        <div className='bg-main-background px-6 pt-14 min-h-screen text-white pb-16'>
            <div className='flex items-center rounded-lg hover:cursor-pointer py-4 gap-4 w-full justify-between'>
                <svg data-aos="fade-left" onClick={() => navigate('/membership')} xmlns="http://www.w3.org/2000/svg" className='w-10' fill="none" viewBox="0 0 24 24">
                    <path fill="#fff" d="M5.25 11.25h15a.75.75 0 1 1 0 1.5h-15a.75.75 0 1 1 0-1.5" />
                    <path fill="#fff" d="m5.56 12 6.221 6.219a.751.751 0 1 1-1.062 1.062l-6.75-6.75a.75.75 0 0 1 0-1.062l6.75-6.75a.751.751 0 0 1 1.062 1.062z" />
                </svg>
                <h1 className='text-3xl font-bold text-white text-right' data-aos="fade-left">Complete your payment</h1>
            </div>
            {plan && (
                <>
                    <div className='mt-12'>
                        <div data-aos="fade-left" data-aos-delay="200" className='bg-linear-to-tr from-secondary-background to-main-background shadow-[0_0_4px_1px_rgba(225,225,225,.1)] rounded-xl p-6'>
                            <div className='flex'>
                                <img src={StarIcon} alt="Star" />
                                <span className='text-white capitalize text-base ml-4'>{plan.name} package</span>
                            </div>
                            <div className='flex flex-col items-center mt-10 gap-2 pb-10'>
                                <p className='text-xl text-medium line-through font-light'>Rp {Number(plan.original_price).toLocaleString('id-ID')}</p>
                                <ShinyText
                                    text={`Rp ${Number(plan.sale_price).toLocaleString('id-ID')}`}
                                    speed={2}
                                    delay={0}
                                    color="#A14ED7"
                                    shineColor="#C7A6DC"
                                    spread={120}
                                    direction="left"
                                    yoyo={false}
                                    pauseOnHover={false}
                                    disabled={false}
                                    className="text-4xl font-bold"
                                />
                            </div>
                            <div className='flex flex-row items-center justify-center text-medium gap-2 font-medium'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#a3a3a3" d="M13.333 2a.667.667 0 1 0 0-1.333H2.667a.667.667 0 0 0 0 1.333h.699c.097 1.224.495 3.833 2.13 5.333C3.771 9.007 3.42 12.49 3.35 14h-.684a.666.666 0 1 0 0 1.333h10.666a.667.667 0 1 0 0-1.333h-.684c-.07-1.51-.421-4.991-2.144-6.667 1.634-1.501 2.032-4.11 2.129-5.333zm-4.28 4.75a.667.667 0 0 0 .024 1.179c1.624.818 2.133 4.207 2.236 6.071H4.687c.1-1.867.612-5.253 2.236-6.071a.667.667 0 0 0 .024-1.178C5.254 5.81 4.818 3.229 4.705 2h6.59c-.113 1.23-.549 3.811-2.242 4.75M8 8.668s2 1.6 2 2.4v2.266H6v-2.266c0-.8 2-2.4 2-2.4" /></svg>
                                <span>{plan.duration_days} days</span>
                            </div>
                        </div>
                        <div className='mt-10' data-aos="fade-right" data-aos-delay="400">
                            <Benefits benefits={plan.benefits} />
                        </div>
                    </div>
                    <div className='pt-14 mb-10 hover:cursor-pointer' data-aos="fade-left">
                        <PurchaseButton planId={planId} />
                    </div>
                </>
            )}
        </div>
    )
}

export default PurchaseMembership
