import { useEffect, useState } from "react";
import { getInactiveAdmissions } from "../../Managers/AdmissionManager.js";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export const InactiveList = () => {

    const { userId } = useParams();

    const [inactiveAdmissions, setInactiveAdmissions] = useState([]);

    useEffect(() => {
        getInactiveAdmissions(userId)
            .then((admissions) => setInactiveAdmissions(admissions));
    }, [userId])

    return (

        <div className="inactive-section">
            <h1>Admission History</h1>

            {inactiveAdmissions.length > 0 ?

                <table className="inactive-table">
                    <thead>
                        <tr>
                            <th>Hospital</th>
                            <th>Reason</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th className="button-column"></th>
                        </tr>
                    </thead>

                    <tbody>

                        {inactiveAdmissions.map((admission) => {

                            const formattedStartDate = new Date(admission.startDateTime).toLocaleString(undefined, {
                                month: 'long',
                                day: 'numeric'
                            });

                            
                            const formattedEndDate = new Date(admission.endDateTime).toLocaleString(undefined, {
                                month: 'long',
                                day: 'numeric'
                            });

                            return (
                                <tr key={admission.id}>
                                    <td>{admission.hospitalName}</td>
                                    <td>{admission.reason}</td>
                                    <td>{formattedStartDate}</td>
                                    <td>{formattedEndDate}</td>
                                    <td className="button-column d-flex justify-content-start">
                                        <Button className="btn-sm m-1  purple-button" color="primary" tag={Link} to={`/admission/${admission.id}`}>View Details</Button>
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