import { useState } from "react";
import { addPerson } from "../../Managers/PeopleManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"

export const PersonForm = () => {

    const navigate = useNavigate();

    const {admissionId} = useParams();

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const [newPerson, updateNewPerson] = useState({
        staffName: "",
        staffTitle: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const personToSendToAPI = {
            StaffName: newPerson.staffName,
            StaffTitle: newPerson.staffTitle,
            MeetDateTime: correctedDate,
            AdmissionId: parseInt(admissionId)
        }

        addPerson(personToSendToAPI)
        .then(() => {
                navigate(`/`);
        });
    };

    return (
        <form className="person-form">
            <h2 className="person-form-title">Add a Person</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="staffName">Name:</Label>
                    <Input
                        className="admission-input"
                        type="text"
                        id="staffName"
                        value={newPerson.staffName}
                        onChange={
                            (event) => {
                                const copy = { ...newPerson }
                                copy.staffName = event.target.value
                                updateNewPerson(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="staffTitle">Title:</Label>
                    <Input
                        className="admission-input"
                        type="text"
                        id="staffTitle"
                        value={newPerson.staffTitle}
                        onChange={
                            (event) => {
                                const copy = { ...newPerson }
                                copy.staffTitle = event.target.value
                                updateNewPerson(copy)
                            }
                        } />
                </FormGroup>

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save New Person</Button>
        </form>
    )




}