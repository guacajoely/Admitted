const baseUrl = "https://localhost:5001/api/Questions";

export const getQuestionList = (admissionId) => {
    return fetch(`${baseUrl}/${admissionId}`)
        .then((res) => res.json())
};

export const addQuestion = (questionObject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(questionObject),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to create new Question")
        }
        return res.json();
    });
};


export const getQuestionById = (id) => {
    return fetch(`${baseUrl}/GetById?Id=${id}`)
        .then((res) => res.json())
};


export const editQuestion = (question) => {
    return fetch(`${baseUrl}/${question.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
}

export const deleteQuestion = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then(getAllQuestions)
}

export const getAllQuestions = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};