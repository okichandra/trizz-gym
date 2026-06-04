export const getTransactions = async (userId) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions/${userId}`
    )

    if(!response.ok) {
        throw new Error("Failed to fetch transactions")
    }

    return response.json()
}