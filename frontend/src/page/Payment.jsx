import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../api/config";
import LoadingAnimation from '../assets/loading-animation.gif'

function Payment() {

    const { transactionId } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] =
        useState(null);
    const handleSimulatePayment = async () => {
        const response = await fetch(
            `${API_URL}/transactions/${transactionId}/simulate-payment`,
            {
                method: "POST"
            }
        );
        const data = await response.json();
        if (data.success) {
            alert(
                "Membership activated!"
            );
            navigate("/account");
        }
    };
    useEffect(() => {
        const fetchTransaction = async () => {
            const response = await fetch(
                `${API_URL}/payment-status/${transactionId}`
            );
            const data = await response.json();
            if (data.success) {
                setTransaction(
                    data.transaction
                );
            }
        };
        fetchTransaction();
    }, [transactionId]);
    if (!transaction) {
        return <div className="bg-main-background w-full min-h-screen flex items-center justify-center">
            <img src={LoadingAnimation} alt="loading animation" className="w-5 h-5"/>
            <p>Wait a moment...</p>
            </div>;
    }
    return (
        <div className="bg-main-background w-full min-h-screen text-white px-6 pt-14 font-rethink-sans">
            <h1 className="text-3xl text-left font-bold mb-10">Payment</h1>
            <div className="flex flex-col gap-5 font-light">
                <div className="flex flex-col gap-1">
                    <p className="text-base capitalize">
                        Transaction Code
                    </p>
                    <p className="text-medium text-sm">
                        {transaction.transaction_code}
                    </p>
                </div>
                <div>
                    <p className="text-base capitalize">
                        Amount
                    </p>
                    <p className="text-medium text-sm">
                        Rp {Number(transaction.amount).toLocaleString('id-ID')}
                    </p>
                </div>
                <div>
                    <p className="text-base capitalize">
                        Status
                    </p>
                    <p className="text-medium text-sm capitalize">
                        {transaction.status}
                    </p>
                </div>
            </div>
            <button
                onClick={handleSimulatePayment}
                className="bg-purple-700 py-2 font-semibold w-full rounded-lg mt-10"
            >
                Complete Payment
            </button>
        </div>
    );
}

export default Payment;