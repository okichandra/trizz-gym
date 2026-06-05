import { API_URL } from "./config"
export const getTransactions = async (userId) => {
    const response = await fetch(
        `${API_URL}/transactions/${userId}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch transactions")
    }

    return response.json()
}

export const purchaseMembership = async (userId, membershipId) => {
    const response = await fetch(
        `${API_URL}/memberships`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                membership_plan_id: membershipId
            })
        }
    )

    return response.json()
}