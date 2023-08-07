import { Link, useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap"
import { useState, useEffect } from "react";
import { editAdmission, getActiveAdmission } from "../../Managers/AdmissionManager.js";
import { PeopleList } from "../People/PeopleList.js";
import { MedicationList } from "../Medication/MedicationList.js";
import { EventList } from "../Events/EventList.js";
import { QuestionList } from "../Questions/QuestionList.js";

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

    function toStandardTime(militaryTime) {
        militaryTime = militaryTime.split(':');
        return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ' PM' : militaryTime.join(':') + ' AM'
    }

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
                <h1>CURRENT STAY</h1>
                <div className="admission-details">
                    <div className="admission-prop"><strong>Name:</strong> <span className="detail">{UserObject.fullName}</span></div>
                    <div className="admission-prop"><strong>Hospital: </strong><span className="detail">{admission.hospitalName}</span></div>
                    <div className="admission-prop"><strong>Reason: </strong><span className="detail">{admission.reason}</span></div>
                    <div className="admission-prop"><strong>Room #: </strong><span className="detail">{admission.roomNum}</span></div>
                    <div className="admission-prop"><strong>Room Phone #: </strong><span className="detail">{admission.roomPhoneNum ? admission.roomPhoneNum : "N/A" }</span></div>
                    <div className="admission-prop"><strong>Admission Date: </strong><span className="detail">{formattedDate}</span></div>
                    <div className="admission-prop"><strong>Estimated Stay Length: </strong><span className="detail">{ admission.estimatedStayDays ? admission.estimatedStayDays + " (days)" : "N/A"}</span></div>
                    <div className="admission-prop"><strong>Nurse Shift Change: </strong><span className="detail">{admission.nurseChangeTime ? toStandardTime(admission.nurseChangeTime) : "N/A"}</span></div>
                    <div className="admission-prop"><strong>Daily Doctor Meeting: </strong><span className="detail">{admission.nurseChangeTime ? toStandardTime(admission.doctorMeetTime) : "N/A"}</span></div>
                </div>
                <div className="admission-buttons">
                    <Button className="m-1" tag={Link} to="/admission/edit">Edit Details</Button>
                    <Button className="m-1" color="danger" tag={Link} onClick={handleDeleteButtonClick}>Discharged</Button>
                </div>
            
            <PeopleList admissionId={admission.id} />
            <MedicationList admissionId={admission.id} />
            <EventList admissionId={admission.id} />
            <QuestionList admissionId={admission.id} />
        </Container>
        </>

        //IF NO, DISPLAY "Create Stay" button
        :
        <>
        <Container className="admission-section">
            <div className="m-auto admission-details"><strong>According to our records, you aren't currently admitted.</strong></div>
            <Button className="admission-button" tag={Link} to="/admission/create">Create a Hospital Stay</Button>
        </Container>
        </>
    )
}