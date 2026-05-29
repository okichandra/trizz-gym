import { API_URL } from "./config";

export async function register(data) {
    const response = await fetch(
        `${API_URL}/register.php`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return response.json();
}

export async function login(data) {
    const response = await fetch(
        `${API_URL}/login.php`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    return response.json();
}