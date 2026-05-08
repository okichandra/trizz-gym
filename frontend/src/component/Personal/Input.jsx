import React from 'react'
import EyeOpen from '../../assets/eye-open.svg'
import EyeClose from '../../assets/eye-close.svg'

function Input({ type, id, placeholder, label }) {

    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className='flex flex-col gap-2 relative'>
            {label && <label htmlFor={id} className='text-xs'>{label}</label>}
            <div className='relative'>
                <input type={type === 'password' ? (showPassword ? 'text' : 'password') : type} id={id} placeholder={placeholder} className='bg-third-background py-2 px-7 rounded-lg text-sm w-full' />
                <img className={`absolute right-5 top-2.5 cursor-pointer ${type === 'password' ? '' : 'hidden'}`} width={16} src={showPassword ? EyeOpen : EyeClose} alt="Toggle password visibility" onClick={() => setShowPassword(!showPassword)} />
            </div>
        </div>
    )
}

export default Input
