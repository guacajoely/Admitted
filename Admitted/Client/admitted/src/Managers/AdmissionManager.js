const baseUrl = "https://localhost:5001/api/Admission";

export const getActiveAdmission = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
        .then((res) => res.json())
};


export const getAdmissionById = (id) => {
    return fetch(`${baseUrl}/GetById?Id=${id}`)
        .then((res) => res.json())
};


export const getInactiveAdmissions = (userId) => {
    return fetch(`${baseUrl}/GetInactives/${userId}`)
        .then((res) => res.json())
};

export const checkIfActiveAdmissions = (userId) => {
    return fetch(`${baseUrl}/CheckActives/${userId}`)
        .then((res) => res.json())
};

export const checkIfInactiveAdmissions = (userId) => {
    return fetch(`${baseUrl}/CheckInactives/${userId}`)
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