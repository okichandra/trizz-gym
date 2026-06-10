import React from 'react'
import { API_URL } from '../../api/config'
import { useNavigate } from 'react-router-dom'

function JoinButton({ plan }) {

    const navigate = useNavigate();

    const handleJoin = () => {
        navigate(`/membership/purchase/${plan.id}`);
    }
    return (
        <button onClick={handleJoin} className='border bg-white text-black text-sm font-semibold py-2 px-10 w-full rounded-lg cursor-pointer hover:bg-gray-300'>Join membership</button>
    )
}

export default JoinButton
