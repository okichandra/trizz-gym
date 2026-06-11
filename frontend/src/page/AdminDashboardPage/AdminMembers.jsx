import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";

export default function AdminMembers() {

    const [members, setMembers] = useState([]);
    const [showAddModal, setShowAddModal] =
        useState(false);

    const [newMember, setNewMember] =
        useState({
            full_name: "",
            username: "",
            email: "",
            password: ""
        });

    const [selectedMember, setSelectedMember] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: ""
    });

    const fetchMembers = () => {
        fetch(`${API_URL}/admin/members`)
            .then(res => res.json())
            .then(data => {
                setMembers(data.members);
            });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleEdit = async (id) => {

        const response = await fetch(
            `${API_URL}/admin/members/${id}`
        );

        const data = await response.json();

        setSelectedMember(data.member);

        setFormData({
            full_name: data.member.full_name,
            username: data.member.username,
            email: data.member.email
        });

        setShowModal(true);
    };
    const handleCreate = async () => {

        const response = await fetch(
            `${API_URL}/admin/members`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(
                    newMember
                )
            }
        );

        const data =
            await response.json();

        if (!data.success) {
            alert("Failed");
            return;
        }

        alert("Member created");

        setShowAddModal(false);

        setNewMember({
            full_name: "",
            username: "",
            email: "",
            password: ""
        });

        fetchMembers();
    };

    const handleSave = async () => {

        await fetch(
            `${API_URL}/admin/members/${selectedMember.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        alert("Member updated");

        setShowModal(false);

        fetchMembers();
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete member?"
        );

        if (!confirmDelete) return;

        await fetch(
            `${API_URL}/admin/members/${id}`,
            {
                method: "DELETE"
            }
        );

        alert("Member deleted");

        fetchMembers();
    };

    return (
        <div className="bg-main-background text-white p-6">

            <h1 className="text-3xl text-left font-bold mb-6">
                Members
            </h1>
            <div className="flex justify-end mb-5">
                <button
                    onClick={() =>
                        setShowAddModal(true)
                    }
                    className="
            bg-green-600
            hover:bg-green-700
            px-4 py-2
            rounded-lg
        "
                >
                    Add Member
                </button>
            </div>
            <div className="flex flex-col gap-4">

                <div className="hidden md:flex justify-between items-center bg-gray-800 p-4 font-bold text-gray-300 rounded-lg text-sm border-b border-gray-700">
                    <div className="w-12">ID</div>
                    <div className="flex-1 px-4">Name</div>
                    <div className="w-40">Member Code</div>
                    <div className="w-32">Status</div>
                    <div className="w-44">Plan</div>
                    <div className="w-32">Action</div>
                </div>

                {members.map(member => (

                    <div
                        key={member.id}
                        className="
                            flex flex-col
                            md:flex-row
                            md:items-center
                            justify-between
                            bg-gray-900/50
                            hover:bg-gray-900
                            p-4
                            rounded-xl
                            border
                            border-gray-800
                            transition-all
                            gap-2
                            md:gap-0
                        "
                    >

                        <div className="w-12 text-sm text-gray-500 font-mono">
                            #{member.id}
                        </div>

                        <div className="flex-1 md:px-4 font-semibold text-lg md:text-base">
                            {member.full_name}
                        </div>

                        <div className="w-40 text-sm bg-gray-800 px-2 py-1 rounded md:w-40 font-mono text-gray-400">
                            {member.member_code}
                        </div>

                        <div className="w-32 text-sm">
                            <span
                                className={`
                                    inline-block
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-bold
                                    ${member.membership_status === "Active"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                    }
                                `}
                            >
                                {member.membership_status}
                            </span>
                        </div>

                        <div className="w-44 text-sm text-gray-400 font-medium">
                            {member.membership_plan || "-"}
                        </div>

                        <div className="flex gap-2">

                            <button
                                onClick={() =>
                                    handleEdit(member.id)
                                }
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    px-3
                                    py-1
                                    rounded
                                    text-xs
                                "
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(member.id)
                                }
                                className="
                                    bg-red-600
                                    hover:bg-red-700
                                    px-3
                                    py-1
                                    rounded
                                    text-xs
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {showModal && (

                <div
                    className="
                        fixed
                        inset-0
                        bg-black/70
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >

                    <div
                        className="
                            bg-white
                            text-black
                            p-6
                            rounded-xl
                            w-full
                            max-w-md
                        "
                    >

                        <h2 className="text-xl font-bold mb-4">
                            Edit Member
                        </h2>

                        <input
                            className="
                                border
                                p-2
                                w-full
                                rounded
                                mb-3
                            "
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    full_name:
                                        e.target.value
                                })
                            }
                        />

                        <input
                            className="
                                border
                                p-2
                                w-full
                                rounded
                                mb-3
                            "
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username:
                                        e.target.value
                                })
                            }
                        />

                        <input
                            className="
                                border
                                p-2
                                w-full
                                rounded
                                mb-3
                            "
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email:
                                        e.target.value
                                })
                            }
                        />

                        <div className="flex gap-2">

                            <button
                                onClick={handleSave}
                                className="
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                Save
                            </button>

                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="
                                    bg-gray-500
                                    hover:bg-gray-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}
            {
                showAddModal && (

                    <div
                        className="
                fixed inset-0
                bg-black/70
                flex
                items-center
                justify-center
                z-50
            "
                    >

                        <div
                            className="
                    bg-white
                    text-black
                    p-6
                    rounded-xl
                    w-full
                    max-w-md
                "
                        >

                            <h2
                                className="
                        text-xl
                        font-bold
                        mb-4
                    "
                            >
                                Add Member
                            </h2>

                            <input
                                placeholder="Full Name"
                                className="border p-2 w-full rounded mb-3"
                                value={newMember.full_name}
                                onChange={(e) =>
                                    setNewMember({
                                        ...newMember,
                                        full_name:
                                            e.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="Username"
                                className="border p-2 w-full rounded mb-3"
                                value={newMember.username}
                                onChange={(e) =>
                                    setNewMember({
                                        ...newMember,
                                        username:
                                            e.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="Email"
                                className="border p-2 w-full rounded mb-3"
                                value={newMember.email}
                                onChange={(e) =>
                                    setNewMember({
                                        ...newMember,
                                        email:
                                            e.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="Password"
                                type="password"
                                className="border p-2 w-full rounded mb-3"
                                value={newMember.password}
                                onChange={(e) =>
                                    setNewMember({
                                        ...newMember,
                                        password:
                                            e.target.value
                                    })
                                }
                            />

                            <div className="flex gap-2">

                                <button
                                    onClick={handleCreate}
                                    className="
                            bg-green-600
                            text-white
                            px-4 py-2
                            rounded
                        "
                                >
                                    Create
                                </button>

                                <button
                                    onClick={() =>
                                        setShowAddModal(false)
                                    }
                                    className="
                            bg-gray-500
                            text-white
                            px-4 py-2
                            rounded
                        "
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
}