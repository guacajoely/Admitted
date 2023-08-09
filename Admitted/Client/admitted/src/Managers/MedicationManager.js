const baseUrl = "https://localhost:5001/api/Medication";

export const getMedList = (admissionId) => {
    return fetch(`${baseUrl}/${admissionId}`)
        .then((res) => res.json())
};

export const addMedication = (medicationObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medicationObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Person")
        }
        return res.json();
    });
};


export const getMedicationById = (id) => {
    return fetch(`${baseUrl}/GetById?Id=${id}`)
        .then((res) => res.json())
};


export const editMedication = (medication) => {
    return fetch(`${baseUrl}/${medication.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(medication)
    })
}

export const deleteMedication = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
}

export const getAllMedications = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};