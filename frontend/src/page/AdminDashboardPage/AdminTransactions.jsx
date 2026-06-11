import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/admin/transactions`)
            .then(res => res.json())
            .then(data => {
                setTransactions(data.transactions);
            });
    }, []);

    // Fungsi pembantu untuk memberi warna badge status transaksi
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'success':
            case 'paid':
                return 'bg-green-500/20 text-green-400';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'failed':
            case 'cancelled':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="bg-main-background text-white p-6">
            <h1 className="text-3xl font-bold mb-6">
                Transactions
            </h1>

            {/* Wadah Utama Flex */}
            <div className="flex flex-col gap-4">

                {/* Header Pengganti Tabel (Muncul hanya di Desktop) */}
                <div className="hidden md:flex justify-between items-center bg-gray-800 p-4 font-bold text-gray-300 rounded-lg text-sm border-b border-gray-700">
                    <div className="w-40">Code</div>
                    <div className="flex-1 px-4">User</div>
                    <div className="w-44">Plan</div>
                    <div className="w-36">Amount</div>
                    <div className="w-32">Status</div>
                </div>

                {/* Looping Data Transaksi */}
                {transactions.map(tx => (
                    <div
                        key={tx.id}
                        className="flex flex-col md:flex-row md:items-center justify-between bg-gray-900/50 hover:bg-gray-900 p-4 rounded-xl border border-gray-800 transition-all gap-2 md:gap-0"
                    >
                        {/* Kode Transaksi */}
                        <div className="w-40 text-sm font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded w-fit md:w-40">
                            <span className="inline md:hidden text-gray-500 font-sans mr-1">Code:</span>
                            {tx.transaction_code}
                        </div>

                        {/* Nama User */}
                        <div className="flex-1 md:px-4 font-semibold text-lg md:text-base">
                            {tx.user?.full_name || "Unknown User"}
                        </div>

                        {/* Nama Plan */}
                        <div className="w-44 text-sm text-gray-400 font-medium">
                            <span className="inline md:hidden text-gray-500 mr-1">Plan:</span>
                            {tx.membership?.plan?.name || "-"}
                        </div>

                        {/* Total Nominal */}
                        <div className="w-36 text-sm font-semibold text-green-400 md:text-white">
                            <span className="inline md:hidden text-gray-500 font-normal mr-1">Amount:</span>
                            Rp {Number(tx.amount).toLocaleString('id-ID')}
                        </div>

                        {/* Status Transaksi */}
                        <div className="w-32 text-sm">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(tx.status)}`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
