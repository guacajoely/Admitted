import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { addMedication } from "../../Managers/MedicationManager.js";

export const MedicationForm = () => {

    const navigate = useNavigate();

    const {admissionId} = useParams();

    const currentDate = new Date();
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0);
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const [newMed, updateNewMed] = useState({
        medicationName: "",
        purpose: "",
        frequencyHours: null
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const medicationToSendToAPI = {
            MedicationName: newMed.medicationName,
            Purpose: newMed.purpose,
            FrequencyHours: newMed.frequencyHours,
            PrescribeDateTime: correctedDate,
            AdmissionId: parseInt(admissionId)
        }

        addMedication(medicationToSendToAPI)
        .then(() => {
                navigate(`/`);
        });
    };

    return (
        <form className="medication-form form">
            <h2 className="medication-form-title">Add a Medication</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="medicationName">Name:</Label>
                    <Input
                        className="medication-input med-text-input"
                        type="text"
                        id="medicationName"
                        value={newMed.medicationName}
                        onChange={
                            (event) => {
                                const copy = { ...newMed }
                                copy.medicationName = event.target.value
                                updateNewMed(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="purpose">Purpose:</Label>
                    <Input
                        className="medication-input med-text-input"
                        type="text"
                        id="purpose"
                        value={newMed.purpose}
                        onChange={
                            (event) => {
                                const copy = { ...newMed }
                                copy.purpose = event.target.value
                                updateNewMed(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="frequencyHours">Dose Frequency (hours):</Label>
                    <Input
                        className="medication-input number-input"
                        type="number"
                        id="frequencyHours"
                        value={newMed.frequencyHours}
                        onChange={
                            (event) => {
                                const copy = { ...newMed }
                                copy.frequencyHours = event.target.value
                                updateNewMed(copy)
                            }
                        } />
                </FormGroup>

              

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save New Medication</Button>
                <Button className="m-1" tag={Link} to="/" color="danger">Cancel</Button>
        </form>
    )




}