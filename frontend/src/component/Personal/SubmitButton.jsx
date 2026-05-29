import React from 'react'
import LoadingAnimation from '../../assets/loading-animation.gif'

function SubmitButton({ text, waiting }) {
    return (
        <button type="submit" disabled={waiting} className='py-2 my-4 bg-light text-dark text-sm font-semibold rounded-lg active:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200'>
            <div className='flex justify-center items-center'>
                {text}
                {waiting && <img src={LoadingAnimation} alt="Loading" className='w-5 h-5 ml-2' />}
            </div>
        </button>
    )
}

export default SubmitButton