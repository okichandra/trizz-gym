import React, { useState } from 'react'
import axios from 'axios';

function TestDB() {

    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');

    const kirimData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/add_user.php",
                {
                    nama: nama,
                    email: email
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='border border-blue-400 flex justify-center'>
            <div className='flex flex-col gap-5 justify-center items-center h-screen w-1/2 '>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className='border border-red-300'
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-red-300'
                />
                <button onClick={kirimData} className='bg-green-500 py-4 px-8'>Submit</button>
            </div>
        </div>
    )
}

export default TestDB
