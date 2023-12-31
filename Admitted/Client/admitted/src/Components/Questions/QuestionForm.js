import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { addQuestion } from "../../Managers/QuestionsManager.js";

export const QuestionForm = () => {

    const navigate = useNavigate();

    const {admissionId} = useParams();

    const currentDate = new Date();
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0);
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const [newQuestion, updateNewQuestion] = useState({
        questionText: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const questionToSendToAPI = {
            QuestionDateTime: correctedDate,
            AnswerDateTime: null,
            QuestionText: newQuestion.questionText,
            AnswerText: null,
            AdmissionId: parseInt(admissionId)
        }

        addQuestion(questionToSendToAPI)
        .then(() => {
                navigate(`/`);
        });
    };

    return (
        <form className="question-form form">
            <h2 className="question-form-title">Add a Question</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="questionText">Question:</Label>
                    <Input
                        className="question-input med-text-input"
                        type="textarea"
                        id="questionText"
                        rows="5" cols="40"
                        value={newQuestion.questionText}
                        onChange={
                            (event) => {
                                const copy = { ...newQuestion }
                                copy.questionText = event.target.value
                                updateNewQuestion(copy)
                            }
                        } />
                </FormGroup>

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary purple-button">Save New Question</Button>
                <Button className="m-2 delete-button" tag={Link} to="/" color="danger">Cancel</Button>
        </form>
    )
}