import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteMedication, getMedList } from "../../Managers/MedicationManager.js";
import { deleteMedDose, getMedDoseList } from "../../Managers/MedDoseManager.js";

export const MedicationList = ({ admissionId }) => {

    const [medList, setMedList] = useState([]);

    useEffect(() => {
        getMedList(admissionId)
            .then((meds) => setMedList(meds));
    }, [admissionId])

    const navigate = useNavigate();

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this medication?'))
        const [, medId] = event.target.id.split("--")
        const parsedId = parseInt(medId)

        if (results) {
            getMedDoseList(medId)
                .then((doses) => {
                    doses.forEach((dose) => {
                        deleteMedDose(dose.id)
                        return parsedId
                    }
                    )
                })

                .then(() => deleteMedication(parsedId))
                .then(() => getMedList(admissionId))
                .then((meds) => setMedList(meds))
        }

    };



    return (

        <div className="medication-section">
            <h1>Medication <Button className="btn-sm m-1" color="primary" tag={Link} to={`/medication/create/${admissionId}`}>Add a Medication</Button></h1>

            {medList.length > 0 ?

                <table className="medication-table">
                    <thead>
                        <tr>
                            <th style={{ maxWidth: "20%" }}>Name</th>
                            <th style={{ maxWidth: "20%" }}>Purpose</th>
                            <th style={{ maxWidth: "10%" }}>Frequency (hours)</th>
                            <th style={{ maxWidth: "15%" }}>Prescribed Date</th>
                            <th style={{ maxWidth: "20%" }} className="button-column"></th>
                        </tr>
                    </thead>

                    <tbody>

                        {medList.map((med) => {

                            const formattedDate = new Date(med.prescribeDateTime).toLocaleString(undefined, {
                                month: 'long',
                                day: 'numeric'
                            });

                            return (
                                <tr key={med.id}>
                                    <td>{med.medicationName}</td>
                                    <td>{med.purpose}</td>
                                    <td>{med.frequencyHours}</td>
                                    <td>{formattedDate}</td>
                                    <td className="button-column d-flex justify-content-start">
                                        <Button className="btn-sm m-1" color="primary" tag={Link} to={`/medDose/${med.id}`}>Dose History</Button>
                                        <Button className="btn-sm m-1" tag={Link} to={`/medication/edit/${med.id}`}>Edit</Button>
                                        <Button id={`med--${med.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                : <></>
            }

        </div>
    )
}