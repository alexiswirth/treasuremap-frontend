import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const uploadFile = async (content: string) => {
    try {
        const payload = JSON.stringify({ content: content })

        const response = await axios.post(`${API_BASE_URL}/api/simulate`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
