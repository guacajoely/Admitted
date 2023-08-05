const baseUrl = "https://localhost:5001/api/MedDose";

export const getMedDoseList = (medId) => {
    return fetch(`${baseUrl}/${medId}`)
        .then((res) => res.json())
};

export const addMedDose = (medDoseObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medDoseObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Dose")
        }
        return res.json();
    });
};


export const getMedDoseById = (id) => {
    return fetch(`${baseUrl}/GetById?Id=${id}`)
        .then((res) => res.json())
};


export const editMedDose = (medDose) => {
    return fetch(`${baseUrl}/${medDose.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(medDose)
    })
}

export const deleteMedDose = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then(getAllMedDoses)
}

export const getAllMedDoses = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};