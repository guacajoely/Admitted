import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addMedDose, deleteMedDose, getMedDoseList } from "../../Managers/MedDoseManager.js";
import { getMedicationById } from "../../Managers/MedicationManager.js";

export const MedDoseList = () => {

    const [medDoseList, setMedDoseList] = useState([]);
    const [medication, setMedication] = useState([]);

    const {medId} = useParams();

    const navigate = useNavigate();

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    useEffect(() => {
        getMedDoseList(medId)
            .then((meds) => setMedDoseList(meds));
    }, [medId])

    useEffect(() => {
        getMedicationById(medId)
            .then((medObject) => setMedication(medObject));
    }, [medId])

    const handleAddButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to add a Dose?'))

        if (results) {

            const doseToSendToAPI = {
                DoseDateTime: correctedDate,
                MedicationId: medId
            }

            addMedDose(doseToSendToAPI)
                .then(getMedDoseList(medId))
                .then((meds) => setMedDoseList(meds))
                .then(navigate(`/medDose/${medId}`))
                
        };
    };

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this Dose?'))
        const [, medDoseId] = event.target.id.split("--")
        const parsedId = parseInt(medDoseId)

        if (results) {
            deleteMedDose(parsedId)
                .then(getMedDoseList(medId))
                .then((meds) => setMedDoseList(meds));
        };
    };

    return (
        
        <div className="med-doses-section">
            <h1>Doses of {medication.medicationName} <Button className="btn-sm m-1" color="primary" onClick={handleAddButton}>Add a Dose</Button></h1>

            <table className="med-doses-table">
                <thead>
                    <tr>
                        <th style={{width: "25%"}}>Date</th>
                        <th classname="button-column"></th>
                    </tr>
                </thead>

                <tbody>

                    {medDoseList.map((dose) => {

                        const formattedDateTime = new Date(dose.doseDateTime).toLocaleDateString();

                        return (
                            <tr key={dose.id}>
                                <td>{formattedDateTime}</td>
                                <td classname="button-column">
                                    <Button className="btn-sm m-1" tag={Link} to={`/medDose/edit/${dose.id}`}>Edit</Button>
                                    <Button id={`dose--${dose.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}