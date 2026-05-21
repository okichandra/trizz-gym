import React from 'react'

function SubmitButton({text}) {
    return (
        <button type="submit" className='py-2 my-4 bg-light text-dark text-sm font-semibold rounded-lg'>{text}</button>
    )
}

export default SubmitButton
