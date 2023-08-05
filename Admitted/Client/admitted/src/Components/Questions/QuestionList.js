import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteQuestion, getQuestionList } from "../../Managers/QuestionsManager.js";
import { deleteEvent, getEventList } from "../../Managers/EventsManager.js";

export const QuestionList = ({ admissionId }) => {

    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        getQuestionList(admissionId)
            .then((questions) => setQuestionList(questions));
    }, [admissionId])

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this question?'))
        const [, questionId] = event.target.id.split("--")
        const parsedId = parseInt(questionId)

        if (results) {
            deleteQuestion(parsedId)
                .then(getQuestionList(admissionId))
                .then((questions) => setQuestionList(questions));
        };
    };

    return (
        
        <div className="questions-section">
            <h1>Questions <Button className="btn-sm m-1" color="primary" tag={Link} to={`/questions/create/${admissionId}`}>Add a Question</Button></h1>

            <table className="questions-table">
                <thead>
                    <tr>
                        <th style={{width: "10%"}}>Date</th>
                        <th style={{width: "20%"}}>Question</th>
                        <th style={{width: "10%"}}>Date</th>
                        <th style={{width: "20%"}}>Response</th>
                        <th style={{width: "10%"}} classname="button-column"></th>
                    </tr>
                </thead>

                <tbody>

                    {questionList.map((question) => {

                        const formattedQuestionDate = new Date(question.questionDateTime).toLocaleDateString();
                        const formattedAnswerDate = new Date(question.answerDateTime).toLocaleDateString();

                        return (
                            <tr key={question.id}>
                                <td>{formattedQuestionDate}</td>
                                <td>{question.questionText}</td>
                                <td>{formattedAnswerDate ? formattedAnswerDate : "No Response"}</td>
                                <td>{question.answerText}</td>
                                
                                <td classname="button-column">
                                    <Button className="btn-sm m-1" tag={Link} to={`/questions/edit/${question.id}`} color="secondary">Edit</Button>
                                    <Button id={`question--${question.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}