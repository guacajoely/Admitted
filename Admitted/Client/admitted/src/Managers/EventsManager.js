const baseUrl = "https://localhost:5001/api/Events";

export const getEventList = (admissionId) => {
    return fetch(`${baseUrl}/${admissionId}`)
        .then((res) => res.json())
};

export const addEvent = (eventObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new event")
        }
        return res.json();
    });
};

export const getEventById = (id) => {
    return fetch(`${baseUrl}/GetById?Id=${id}`)
        .then((res) => res.json())
};

export const editEvent = (event) => {
    return fetch(`${baseUrl}/${event.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then(getAllEvents)
}

export const getAllEvents = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};