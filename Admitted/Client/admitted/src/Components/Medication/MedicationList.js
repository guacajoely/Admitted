import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMedication, getMedList } from "../../Managers/MedicationManager.js";

export const MedicationList = ({ admissionId }) => {

    const [medList, setMedList] = useState([]);

    useEffect(() => {
        getMedList(admissionId)
            .then((meds) => setMedList(meds));
    }, [admissionId])


    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this medication?'))
        const [, medId] = event.target.id.split("--")
        const parsedId = parseInt(medId)

        if (results) {
            deleteMedication(parsedId)
                .then(getMedList(admissionId))
                .then((meds) => setMedList(meds));
        };
    };


    return (
        
        <div className="medication-section">
            <h1>Medication <Button className="btn-sm m-1" color="primary" tag={Link} to={`/medication/create/${admissionId}`}>Add a Medication</Button></h1>

            

            <table className="medication-table">
                <thead>
                    <tr>
                        <th style={{width: "20%"}}>Name</th>
                        <th style={{width: "20%"}}>Purpose</th>
                        <th style={{width: "20%"}}>Frequency (hours)</th>
                        <th style={{width: "20%"}}>Prescribed Date</th>
                        <th classname="button-column"></th>
                    </tr>
                </thead>

                <tbody>

                    {medList.map((med) => {

                        const formattedDate = new Date(med.prescribeDateTime).toLocaleDateString();

                        return (
                            <tr key={med.id}>
                                <td>{med.medicationName}</td>
                                <td>{med.purpose}</td>
                                <td>{med.frequencyHours}</td>
                                <td>{formattedDate}</td>
                                <td classname="button-column">
                                <Button className="btn-sm m-1" tag={Link} to={`/medication/edit/${med.id}`}>Edit</Button>
                                <Button id={`med--${med.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                </td>                           
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}