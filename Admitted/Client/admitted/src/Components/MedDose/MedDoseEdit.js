import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { editMedDose, getMedDoseById } from "../../Managers/MedDoseManager.js";

export const MedDoseEdit = () => {

    const [editedDose, setEditedDose] = useState({
        doseDateTime: null
    })

    const {doseId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getMedDoseById(doseId).then((res) => {
            setEditedDose(res)
        }
        );
    }, [doseId])


    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const doseToEdit = {
            Id: editedDose.id,
            DoseDateTime: editedDose.doseDateTime,
            MedicationId: editedDose.medicationId
        }

        return editMedDose(doseToEdit)
            .then(() => {
                navigate(`/medDose/${editedDose.medicationId}`)
            })
    }

    const copy = new Date(editedDose.doseDateTime);
    const formattedDateTime = copy.toLocaleString(undefined, {
        month:  'short',
        day:    'numeric',
        hour:   '2-digit',
        minute: '2-digit',
    });


    return (
        <form className="dose-form">
            <h2 className="dose-form-title">Edit Dose</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="doseDateTime">Dose Date & Time</Label>
                    <Input
                        className="event-input"
                        type="datetime-local"
                        id="doseDateTime"
                        value={editedDose.doseDateTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedDose }
                                copy.doseDateTime = event.target.value
                                setEditedDose(copy)
                            }
                        } />
                </FormGroup>




            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Dose</Button>
        </form>
    )


}