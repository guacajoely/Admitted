import { Link } from "react-router-dom";
import { CardBody, Container, Button } from "reactstrap"
import { useState, useEffect } from "react";
import { getActiveAdmission } from "../../Managers/AdmissionManager.js";

export const Admission = ({ userId }) => {

    const [admission, setAdmission] = useState([]);

    useEffect(() => {
        getActiveAdmission(userId)
            .then((admission) => setAdmission(admission));
    }, [userId])

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

    const AdmissionDateTime = new Date(admission.startDateTime);
    const formattedDate = AdmissionDateTime.toLocaleDateString();

    return (

        //CHECK IF THERE IS AN ACTIVE ADMISSION CURRENTLY STORED IN STATE
        admission.id ?
        //IF YES, DISPLAY DASHBOARD
        <Container>
            <div>
                <h1>CURRENT STAY</h1>
                <div className="admission-prop">Name: {UserObject.fullName}</div>
                <div className="admission-prop">Hospital: {admission.hospitalName}</div>
                <div className="admission-prop">Reason: {admission.reason}</div>
                <div className="admission-prop">Room #: {admission.roomNum}</div>
                <div className="admission-prop">Room Phone #: {admission.roomPhoneNum}</div>
                <div className="admission-prop">Admission Date: {formattedDate}</div>
                <div className="admission-prop">Estimated Stay Length: {admission.estimatedStayDays} (days)</div>
                <div className="admission-prop">Nurse Shift Change: {admission.nurseChangeTime}</div>
                <div className="admission-prop">Daily Doctor Meeting: {admission.doctorMeetTime}</div>
            </div>
        </Container>

        //IF NO, DISPLAY "Create Stay" button
        :
        <>
        <Container>
        <div className="m-5">According to our records, you aren't currently admitted.</div>
        <Button tag={Link} to="/admission/create">Create a Hospital Stay</Button>
        </Container>
        </>
    )
}