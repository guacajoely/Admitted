import { useEffect, useState } from "react"
import { editPerson, getPersonById } from "../../Managers/PeopleManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"

export const PersonEdit = () => {

    const [editedPerson, seteditedPerson] = useState({
        staffName: "",
        staffTitle: ""
    })

    const {personId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getPersonById(personId).then((res) => {
            seteditedPerson(res)
        }
        );
    }, [personId])


    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const personToEdit = {
            Id: editedPerson.id,
            StaffName: editedPerson.staffName,
            StaffTitle: editedPerson.staffTitle,
            MeetDateTime: editedPerson.meetDateTime,
            AdmissionId: editedPerson.admissionId
        }

        return editPerson(personToEdit)
            .then(() => {
                navigate(`/`)
            })
    }


    return (
        <form className="person-form">
            <h2 className="person-form-title">Edit Person</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="staffName">Name:</Label>
                    <Input
                        className="person-input"
                        type="text"
                        id="staffName"
                        value={editedPerson.staffName}
                        onChange={
                            (event) => {
                                const copy = { ...editedPerson }
                                copy.staffName = event.target.value
                                seteditedPerson(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="staffTitle">Title:</Label>
                    <Input
                        className="person-input"
                        type="text"
                        id="staffTitle"
                        value={editedPerson.staffTitle}
                        onChange={
                            (event) => {
                                const copy = { ...editedPerson }
                                copy.staffTitle = event.target.value
                                seteditedPerson(copy)
                            }
                        } />
                </FormGroup>

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Person</Button>
        </form>
    )











}