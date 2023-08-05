import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { editMedication, getMedicationById } from "../../Managers/MedicationManager.js";

export const MedicationEdit = () => {

    const [editedMed, setEditedMed] = useState({
        medicationName: "",
        purpose: "",
        frequencyHours: null
    })

    const {medId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getMedicationById(medId).then((res) => {
            setEditedMed(res)
        }
        );
    }, [medId])


    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const medToEdit = {
            Id: editedMed.id,
            MedicationName: editedMed.medicationName,
            Purpose: editedMed.purpose,
            FrequencyHours: editedMed.frequencyHours,
            PrescribeDateTime: editedMed.prescribeDateTime,
            AdmissionId: editedMed.admissionId
        }

        return editMedication(medToEdit)
            .then(() => {
                navigate(`/`)
            })
    }


    return (
        <form className="medication-form">
            <h2 className="medication-form-title">Edit Medication</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="medicationName">Name:</Label>
                    <Input
                        className="medication-input"
                        type="text"
                        id="medicationName"
                        value={editedMed.medicationName}
                        onChange={
                            (event) => {
                                const copy = { ...editedMed }
                                copy.medicationName = event.target.value
                                setEditedMed(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="purpose">Purpose:</Label>
                    <Input
                        className="medication-input"
                        type="text"
                        id="purpose"
                        value={editedMed.purpose}
                        onChange={
                            (event) => {
                                const copy = { ...editedMed }
                                copy.purpose = event.target.value
                                setEditedMed(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="frequencyHours">Dose Frequency (hours):</Label>
                    <Input
                        className="medication-input"
                        type="number"
                        id="frequencyHours"
                        value={editedMed.frequencyHours}
                        onChange={
                            (event) => {
                                const copy = { ...editedMed }
                                copy.frequencyHours = event.target.value
                                setEditedMed(copy)
                            }
                        } />
                </FormGroup>

              

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Medication</Button>
        </form>
    )





}