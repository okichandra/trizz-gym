import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";

export default function AdminMembershipPlans() {

    const [plans, setPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const emptyForm = {
        name: "",
        original_price: "",
        sale_price: "",
        display_monthly_price: "",
        duration_days: "",
        badge: "",
        description: "",
        benefits: [""]
    };

    const [formData, setFormData] =
        useState(emptyForm);

    const [editingId, setEditingId] =
        useState(null);

    const fetchPlans = () => {
        fetch(`${API_URL}/membership-plans`)
            .then(res => res.json())
            .then(data => {
                setPlans(data.plans);
            });
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleEdit = (plan) => {

        setEditingId(plan.id);

        setFormData({
            name: plan.name,
            original_price: plan.original_price,
            sale_price: plan.sale_price,
            display_monthly_price:
                plan.display_monthly_price,
            duration_days: plan.duration_days,
            badge: plan.badge,
            description: plan.description,

            benefits:
                plan.benefits.map(
                    b => b.benefit_text
                )
        });

        setShowModal(true);
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this membership plan?"
            );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `${API_URL}/admin/membership-plans/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data =
                await response.json();

            alert(
                data.message || "Deleted"
            );

            fetchPlans();

        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {

        try {

            const url = editingId
                ? `${API_URL}/admin/membership-plans/${editingId}`
                : `${API_URL}/admin/membership-plans`;

            const method =
                editingId ? "PUT" : "POST";

            const response = await fetch(
                url,
                {
                    method,
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        formData
                    )
                }
            );

            const data =
                await response.json();

            alert(
                data.message || "Saved"
            );

            setShowModal(false);

            setFormData(emptyForm);

            setEditingId(null);

            fetchPlans();

        } catch (err) {
            console.error(err);
        }
    };

    const removeBenefit = (index) => {
        const updated = formData.benefits.filter(
            (_, i) => i !== index
        );
        setFormData({
            ...formData,
            benefits: updated.length ? updated : [""]
        });
    };

    return (
        <div className="text-white">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <h1 className="text-3xl font-bold">
                    Membership Plans
                </h1>

                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData(emptyForm);
                        setShowModal(true);
                    }}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        transition-colors
                        px-4 py-2
                        rounded-lg
                        font-medium
                        self-start sm:self-auto
                    "
                >
                    + Add Plan
                </button>

            </div>

            {/* Plan list */}
            <div className="flex flex-col gap-4">

                {plans.map(plan => (

                    <div
                        key={plan.id}
                        className="
                            flex flex-col gap-4
                            border border-gray-700
                            bg-secondary-background
                            p-5
                            rounded-xl
                        "
                    >

                        {/* Top row: info + actions */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                            <div className="flex flex-col gap-1">

                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-xl font-semibold">
                                        {plan.name}
                                    </h2>

                                    {plan.badge && (
                                        <span className="
                                            text-xs font-semibold
                                            uppercase tracking-wide
                                            bg-green-600/20
                                            text-green-400
                                            px-2 py-0.5
                                            rounded-full
                                        ">
                                            {plan.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <p className="text-green-400 font-semibold text-lg">
                                        Rp {Number(plan.sale_price).toLocaleString()}
                                    </p>

                                    {plan.original_price &&
                                        Number(plan.original_price) >
                                        Number(plan.sale_price) && (
                                            <p className="text-sm text-gray-500 line-through">
                                                Rp {Number(plan.original_price).toLocaleString()}
                                            </p>
                                        )}
                                </div>

                                <p className="text-sm text-gray-400">
                                    {plan.duration_days} Days
                                </p>

                                {plan.description && (
                                    <p className="text-sm text-gray-400 mt-1">
                                        {plan.description}
                                    </p>
                                )}

                            </div>

                            <div className="flex gap-2 shrink-0">

                                <button
                                    onClick={() =>
                                        handleEdit(plan)
                                    }
                                    className="
                                        flex-1 sm:flex-none
                                        bg-blue-600
                                        hover:bg-blue-700
                                        transition-colors
                                        px-3 py-1.5
                                        rounded-lg
                                        text-sm font-medium
                                    "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(plan.id)
                                    }
                                    className="
                                        flex-1 sm:flex-none
                                        bg-red-600
                                        hover:bg-red-700
                                        transition-colors
                                        px-3 py-1.5
                                        rounded-lg
                                        text-sm font-medium
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                        {/* Benefits */}
                        {plan.benefits.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-700">
                                {plan.benefits.map(
                                    benefit => (
                                        <div
                                            key={benefit.id}
                                            className="
                                                flex items-center gap-1.5
                                                text-sm text-gray-300
                                                bg-white/5
                                                px-3 py-1
                                                rounded-full
                                            "
                                        >
                                            <span className="text-green-400">✓</span>
                                            {benefit.benefit_text}
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                    </div>

                ))}

                {plans.length === 0 && (
                    <div className="
                        border border-dashed border-gray-700
                        rounded-xl
                        p-10
                        flex flex-col items-center justify-center
                        gap-2
                        text-center
                    ">
                        <p className="text-gray-300 font-medium">
                            No membership plans yet
                        </p>
                        <p className="text-sm text-gray-500">
                            Add a plan to make it available to members.
                        </p>
                    </div>
                )}

            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="
                        fixed inset-0
                        bg-black/70
                        flex items-center justify-center
                        p-4
                        z-50
                    "
                >
                    <div
                        className="
                            flex flex-col
                            bg-white
                            text-black
                            w-full
                            max-w-xl
                            max-h-[90vh]
                            rounded-xl
                            overflow-hidden
                        "
                    >
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-2xl font-bold">
                                {
                                    editingId
                                        ? "Edit Plan"
                                        : "Add Plan"
                                }
                            </h2>

                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="
                                    text-gray-400
                                    hover:text-gray-700
                                    transition-colors
                                    text-xl
                                    leading-none
                                "
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="flex flex-col gap-3 px-6 py-4 overflow-y-auto">

                            <input
                                className="border p-2 w-full rounded"
                                placeholder="Plan Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name:
                                            e.target.value
                                    })
                                }
                            />

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className="border p-2 w-full rounded"
                                    placeholder="Original Price"
                                    value={formData.original_price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            original_price:
                                                e.target.value
                                        })
                                    }
                                />

                                <input
                                    className="border p-2 w-full rounded"
                                    placeholder="Sale Price"
                                    value={formData.sale_price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            sale_price:
                                                e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className="border p-2 w-full rounded"
                                    placeholder="Display Monthly Price"
                                    value={formData.display_monthly_price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            display_monthly_price:
                                                e.target.value
                                        })
                                    }
                                />

                                <input
                                    className="border p-2 w-full rounded"
                                    placeholder="Duration Days"
                                    value={formData.duration_days}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            duration_days:
                                                e.target.value
                                        })
                                    }
                                />
                            </div>

                            <input
                                className="border p-2 w-full rounded"
                                placeholder="Badge"
                                value={formData.badge}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        badge:
                                            e.target.value
                                    })
                                }
                            />

                            <textarea
                                className="border p-2 w-full rounded resize-none"
                                rows={3}
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description:
                                            e.target.value
                                    })
                                }
                            />

                            {/* Benefits */}
                            <div className="flex flex-col gap-2">

                                <h3 className="font-semibold">
                                    Benefits
                                </h3>

                                {formData.benefits.map(
                                    (
                                        benefit,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                className="
                                                    border
                                                    p-2
                                                    w-full
                                                    rounded
                                                "
                                                placeholder={`Benefit ${index + 1}`}
                                                value={benefit}
                                                onChange={(e) => {

                                                    const updated =
                                                        [...formData.benefits];

                                                    updated[index] =
                                                        e.target.value;

                                                    setFormData({
                                                        ...formData,
                                                        benefits:
                                                            updated
                                                    });

                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeBenefit(index)}
                                                className="
                                                    text-gray-400
                                                    hover:text-red-600
                                                    transition-colors
                                                    px-2
                                                    text-lg
                                                    leading-none
                                                    shrink-0
                                                "
                                                aria-label="Remove benefit"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                    )
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            benefits: [
                                                ...formData.benefits,
                                                ""
                                            ]
                                        })
                                    }
                                    className="
                                        self-start
                                        bg-gray-700
                                        hover:bg-gray-800
                                        transition-colors
                                        text-white
                                        px-3 py-1.5
                                        rounded
                                        text-sm
                                    "
                                >
                                    + Add Benefit
                                </button>
                            </div>

                        </div>

                        {/* Modal footer */}
                        <div className="flex gap-3 px-6 py-4 border-t">
                            <button
                                onClick={handleSave}
                                className="
                                    flex-1
                                    bg-green-600
                                    hover:bg-green-700
                                    transition-colors
                                    text-white
                                    px-4 py-2
                                    rounded-lg
                                    font-medium
                                "
                            >
                                Save
                            </button>

                            <button
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="
                                    flex-1
                                    bg-gray-200
                                    hover:bg-gray-300
                                    transition-colors
                                    text-gray-800
                                    px-4 py-2
                                    rounded-lg
                                    font-medium
                                "
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}