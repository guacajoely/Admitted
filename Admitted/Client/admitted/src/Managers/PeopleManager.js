const baseUrl = "https://localhost:5001/api/People";

export const getPeopleList = (admissionId) => {
    return fetch(`${baseUrl}/${admissionId}`)
        .then((res) => res.json())
};

export const addPerson = (personObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(personObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Person")
        }
        return res.json();
    });
};


export const getPersonById = (id) => {
    return fetch(`${baseUrl}/GetById?Id=${id}`)
        .then((res) => res.json())
};


export const editPerson = (person) => {
    return fetch(`${baseUrl}/${person.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
}

