const baseUrl = "https://localhost:5001/api/Admission";

export const getActiveAdmission = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
        .then((res) => res.json())
};

export const addAdmission = (admissionObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(admissionObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Admission")
        }
        return res.json();
    });
};


export const editAdmission = (admissionObject) => {
    //make sure your parameter matches the one you are sending to the API
    return fetch(`${baseUrl}/${admissionObject.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(admissionObject)
    })
}