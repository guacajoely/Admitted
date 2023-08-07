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

            {questionList.length > 0 ?

            <table className="questions-table">
                <thead>
                    <tr>
                        <th style={{width: "10%"}}>Date</th>
                        <th style={{width: "20%"}}>Question</th>
                        <th style={{width: "10%"}}>Date</th>
                        <th style={{width: "20%"}}>Response</th>
                        <th style={{width: "10%"}} className="button-column"></th>
                    </tr>
                </thead>

                <tbody>

                    {questionList.map((question) => {

                        const formattedQuestionDate = new Date(question.questionDateTime).toLocaleString(undefined, {
                            month:  'short',
                            day:    'numeric',
                            hour:   '2-digit',
                            minute: '2-digit',
                        });

                        const formattedAnswerDate = new Date(question.answerDateTime).toLocaleString(undefined, {
                            month:  'short',
                            day:    'numeric',
                            hour:   '2-digit',
                            minute: '2-digit',
                        });

                        return (
                            <tr key={question.id}>
                                <td>{formattedQuestionDate}</td>
                                <td>{question.questionText}</td>
                                <td>{question.answerDateTime ? formattedAnswerDate : "N/A"}</td>
                                <td>{question.answerText ? question.answerText : "NO RESPONSE RECORDED"}</td>
                                
                                <td className="button-column">
                                    <Button className="btn-sm m-1" tag={Link} to={`/questions/edit/${question.id}`} color="secondary">Edit</Button>
                                    <Button id={`question--${question.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>


            :<></>
            }
            
        </div>
    )
}