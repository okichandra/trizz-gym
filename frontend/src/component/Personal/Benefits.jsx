import React from 'react'
import CorrectIcon from '../../assets/correct-icon.svg'

function Benefits({ benefits }) {
    return (
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
    )
}

export default Benefits
