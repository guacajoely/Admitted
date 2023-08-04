import { Link, useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap"
import { useState, useEffect } from "react";
import { editAdmission, getActiveAdmission } from "../../Managers/AdmissionManager.js";
import { PeopleList } from "../People/PeopleList.js";

export const Admission = ({ userId }) => {

    const [admission, setAdmission] = useState([]);

    useEffect(() => {
        getActiveAdmission(userId)
            .then((admission) => setAdmission(admission));
    }, [userId])

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

    const navigate = useNavigate();

    const AdmissionDateTime = new Date(admission.startDateTime);
    const formattedDate = AdmissionDateTime.toLocaleDateString();

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const handleDeleteButtonClick = (e) => {
        e.preventDefault()

        const admissionToEdit = { ...admission }

         const admissionToSendToAPI = {
            Id: admissionToEdit.id,
            Reason: admissionToEdit.reason,
            HospitalName: admissionToEdit.hospitalName,
            RoomNum: admissionToEdit.roomNum,
            RoomPhoneNum: admissionToEdit.roomPhoneNum,
            NurseChangeTime: admissionToEdit.nurseChangeTime,
            DoctorMeetTime: admissionToEdit.doctorMeetTime,
            EstimatedStayDays: admissionToEdit.estimatedStayDays,
            StartDateTime: correctedDate.toISOString(),
            EndDateTime: correctedDate,
            UserId: UserObject.id
        }

        return editAdmission(admissionToSendToAPI)
            .then(() => {
                navigate('/')
                window.location.reload()
            })
    }
   

    return (

        //CHECK IF THERE IS AN ACTIVE ADMISSION CURRENTLY STORED IN STATE
        admission.id ?
        //IF YES, DISPLAY DASHBOARD
        <>
        <Container className="admission-section">
            <div className="admission-details">
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
            <Button className="m-1" tag={Link} to="/admission/edit">Edit Details</Button>
            <Button className="m-1" color="danger" tag={Link} onClick={handleDeleteButtonClick}>Discharged</Button>
        </Container>
        <Container>
            <PeopleList admissionId={admission.id} />
        </Container>
        </>

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