const apiUrl = "https://localhost:5001";

export const getActiveAdmission = (userId) => {
    return fetch(`${apiUrl}/api/Admission/${userId}`)
        .then((res) => res.json())
};