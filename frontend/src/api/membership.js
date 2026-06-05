export const getMembershipPlans = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/membership-plans`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch membership plans")
    }

    return response.json()
}

export const getMembershipStatus = async (token) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/validate-qr/${token}`
    )
    if (!response.ok) {
        throw new Error("Failed to fetch membership status")
    }

    return response.json()
}