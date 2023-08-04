const baseUrl = "https://localhost:5001/api/People";

export const getPeopleList = (admissionId) => {
    return fetch(`${baseUrl}/${admissionId}`)
        .then((res) => res.json())
};