import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addMedDose, deleteMedDose, getMedDoseList } from "../../Managers/MedDoseManager.js";
import { getMedicationById } from "../../Managers/MedicationManager.js";

export const MedDoseList = () => {

    const [medDoseList, setMedDoseList] = useState([]);
    const [medication, setMedication] = useState([]);

    const { medId } = useParams();

    const currentDate = new Date()
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0);
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

        const doseToSendToAPI = {
            DoseDateTime: correctedDate,
            MedicationId: medId
        }

        addMedDose(doseToSendToAPI)
            .then(window.location.reload())
            .then(() => getMedDoseList(medId))
            .then((res) => setMedDoseList(res))

    };

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this Dose?'))
        const [, medDoseId] = event.target.id.split("--")
        const parsedId = parseInt(medDoseId)

        if (results) {
            deleteMedDose(parsedId)
            .then(() => getMedDoseList(medId))
            .then((res) => setMedDoseList(res))
        };
    };

    return (

        <div className="dose-section">
            <h1>Doses of {medication.medicationName} <Button className="btn-sm m-1 purple-button" color="primary" onClick={handleAddButton}>Add a Dose</Button></h1>

            <table className="dose-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th className="button-column"></th>
                    </tr>
                </thead>

                <tbody>

                    {medDoseList.map((dose) => {

                        const formattedDateTime = new Date(dose.doseDateTime).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        });

                        return (
                            <tr key={dose.id}>
                                <td>{formattedDateTime}</td>
                                <td className="button-column">
                                    <Button className="btn-sm m-1 edit-button" tag={Link} to={`/medDose/edit/${dose.id}`}>Edit</Button>
                                    <Button id={`dose--${dose.id}`} className="btn-sm m-1 delete-button" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}