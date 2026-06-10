import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentCard from '../../assets/payment-card.svg';
import Aos from 'aos';
import { API_URL } from '../../api/config';

function PurchaseButton({ planId }) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [pendingData, setPendingData] = useState(null);

    const handleSubmit = async () => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) {
            alert("Silakan login terlebih dahulu");
            navigate("/login");
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/purchase-membership`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        membership_plan_id: planId
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (data.type === "pending_payment") {
                    setPendingData(data);
                    setShowModal(true);
                    return;
                }
                alert(data.message);
                return;
            }
            navigate(
                `/payment/${data.transaction.id}`
            );
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan");
        }
    };

    const continuePayment = () => {
        navigate(
            `/payment/${pendingData.transaction_id}`
        );
        setShowModal(false);
    };

    const cancelPendingPayment = async () => {
        try {
            const response = await fetch(
                `${API_URL}/transactions/${pendingData.transaction_id}/cancel`,
                {
                    method: "POST"
                }
            );
            const data = await response.json();
            if (data.success) {
                setShowModal(false);
                alert(
                    "Transaksi sebelumnya dibatalkan.\nSilakan klik Pay Now lagi."
                );
            }
        } catch (error) {
            console.error(error);
            alert("Gagal membatalkan transaksi");
        }
    };
    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-main-background flex justify-center items-center z-50">
                    <div className="bg-main-background/20 backdrop-blur-lg shadow-[0_0_0_1px_rgba(225,225,225,.1)] rounded-xl p-6 w-full max-w-md">
                        <div className='flex items-center justify-between'>
                            <h2 className="text-base font-bold mb-1">
                                Pending Payment Found
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" onClick={() => setShowModal(false)}><path fill="#a3a3a3" fill-rule="evenodd" d="m16.425 4.758-1.183-1.183L10 8.825 4.76 3.575 3.575 4.758 8.825 10l-5.25 5.242 1.184 1.183L10 11.175l5.242 5.25 1.183-1.183L11.175 10z" clip-rule="evenodd" /></svg>
                        </div>
                        <p className="text-xs text-gray-300 mb-5">
                            You still have an unfinished payment.
                        </p>
                        <div className="flex gap-3 flex-col font-semibold">
                            <button
                                onClick={continuePayment}
                                className="flex-1 bg-violet-600 hover:bg-violet-700 py-2 rounded-lg"
                            >
                                Continue previous transaction
                            </button>
                            <button
                                onClick={cancelPendingPayment}
                                className="flex-1 bg-main-background text-purple-600 border-violet-600 border-2 py-2 rounded-lg"
                            >
                                Cancel & Choose New
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <button
                onClick={handleSubmit}
                className="bg-violet-600 hover:cursor-pointer hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded w-full flex justify-center gap-2"
            >
                <img src={PaymentCard} alt="payment card" />
                Pay now
            </button>
        </>
    );
}

export default PurchaseButton;