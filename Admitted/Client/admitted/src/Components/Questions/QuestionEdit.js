import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { editQuestion, getQuestionById } from "../../Managers/QuestionsManager.js";

export const QuestionEdit = () => {

    const [editedQuestion, setEditedQuestion] = useState({
        questionText: "",
        answerText: "",
        questionDateTime: "",
        answerDateTime: ""
    })

    const {questionId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getQuestionById(questionId).then((res) => {
            setEditedQuestion(res)
        }
        );
    }, [questionId])

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const questionToEdit = {
            Id: editedQuestion.id,
            QuestionDateTime: editedQuestion.questionDateTime,
            AnswerDateTime: editedQuestion.answerDateTime,
            QuestionText: editedQuestion.questionText,
            AnswerText: editedQuestion.answerText,
            AdmissionId: editedQuestion.admissionId
        }

        return editQuestion(questionToEdit)
            .then(() => {
                navigate(`/`)
            })
    }


    return (
        <form className="question-form form">
            <h2 className="question-form-title">Edit/Answer Question</h2>

            <FormGroup className="form-group">
                    <Label htmlFor="questionDateTime">Question Date/Time:</Label>
                    <Input
                        className="question-input datetime-input"
                        type="datetime-local"
                        id="questionDateTime"
                        value={editedQuestion.questionDateTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedQuestion }
                                copy.questionDateTime = event.target.value
                                setEditedQuestion(copy)
                            }
                        } />
                </FormGroup>

            <FormGroup className="form-group">
                    <Label htmlFor="questionText">Question:</Label>
                    <Input
                        className="question-input med-text-input"
                        type="textarea"
                        id="questionText"
                        value={editedQuestion.questionText}
                        onChange={
                            (event) => {
                                const copy = { ...editedQuestion }
                                copy.questionText = event.target.value
                                setEditedQuestion(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="answerDateTime">Response Date/Time:</Label>
                    <Input
                        className="question-input datetime-input"
                        type="datetime-local"
                        id="answerDateTime"
                        value={editedQuestion.answerDateTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedQuestion }
                                copy.answerDateTime = event.target.value
                                setEditedQuestion(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="answerText">Response:</Label>
                    <Input
                        className="question-input med-text-input"
                        type="textarea"
                        id="answerText"
                        value={editedQuestion.answerText}
                        onChange={
                            (event) => {
                                const copy = { ...editedQuestion }
                                copy.answerText = event.target.value
                                setEditedQuestion(copy)
                            }
                        } />
                </FormGroup>

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Response</Button>
                <Button className="m-1" tag={Link} to="/" color="danger">Cancel</Button>
        </form>
    )
}