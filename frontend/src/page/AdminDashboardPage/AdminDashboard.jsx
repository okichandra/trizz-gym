import { Navigate, useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const navigate = useNavigate()

    const isAdmin =
        localStorage.getItem("isAdmin");

    if (!isAdmin) {
        return <Navigate to="/admin-login" />;
    }

    const handleLogout = () => {

        localStorage.removeItem(
            "isAdmin"
        );
        navigate("/admin-login");
    };

    return (
        <div>
            Admin Dashboard
            <button
                onClick={handleLogout}
                className="bg-main-background text-white py-2 px-8"
            >
                Logout
            </button>
        </div>
    );
}