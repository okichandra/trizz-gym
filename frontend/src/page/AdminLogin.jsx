import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../api/config";
import FormBackground from "../component/Personal/FormBackground";
import Logo from '../assets/trizz-logo.svg'
import Input from '../component/Personal/Input'
import SubmitButton from "../component/Personal/SubmitButton";

export default function AdminLogin() {

    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!password) {
            alert("Masukkan admin code");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                `${API_URL}/admin/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        admin_code: password
                    })
                }
            );
            const data = await response.json();
            setLoading(false);
            if (!response.ok) {
                alert(data.message);
                return;
            }
            localStorage.setItem(
                "isAdmin",
                "true"
            );
            navigate("/admin");
        } catch (error) {
            setLoading(false);
            console.log(error);
            alert("Terjadi kesalahan");
        }
    };

    return (
        <div className="bg-main-background h-screen w-screen flex md:justify-center md:items-center pt-4 font-rethink-sans">
            <div id='login-container'
                className='w-full md:w-5/6 h-9/10 p-4 bg-secondary-background rounded-lg md:shadow-[0_0_0_1px_rgba(225,225,225,.1)] md:grid grid-cols-12'>
                <FormBackground />
                <div id='login-form' className='col-span-5 m:p-16 md:px-28'>
                    <div className='Logo flex flex-row justify-center items-center pb-24 pt-4 gap-2 font-semibold'>
                        <img src={Logo} alt="trizz logo" className='w-12' />
                        <span className='text-light'>Tirzz GYM</span>
                    </div>
                    <div className='flex flex-col gap-9'>
                        <div className='text-light gap-1.5 flex flex-col'>
                            <h4 className='text-xl'>This is admin login page</h4>
                            <span className='text-medium text-sm'>Please login using admin code first to access</span>
                        </div>
                        <form onSubmit={handleLogin} className='text-light flex flex-col gap-5'>
                            <div className='flex flex-col gap-4 -mt-3'>
                                <Input type="password" id="password" placeholder="********" label="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className='flex flex-col gap-1 -mt-3'>
                                    <SubmitButton text="Sign in" waiting={waiting} />
                                    <span className='text-medium text-sm'>Login as member? <Link to="/login" className='font-semibold text-light'>Login</Link></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}