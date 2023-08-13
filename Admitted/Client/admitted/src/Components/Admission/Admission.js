import { Link, useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap"
import { useState, useEffect } from "react";
import { editAdmission, getActiveAdmission } from "../../Managers/AdmissionManager.js";
import { PeopleList } from "../People/PeopleList.js";
import { MedicationList } from "../Medication/MedicationList.js";
import { EventList } from "../Events/EventList.js";
import { QuestionList } from "../Questions/QuestionList.js";
import { MedDoseTracker } from "../MedDose/MedDoseTracker.js";

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
        const confirmed = (window.confirm("Are you sure you wish to end this stay? You will still be able to view the info you've recorded, but will be unable to edit it once ended."))
        e.preventDefault()

        if(confirmed){
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
    }


    return (

        //CHECK IF THERE IS AN ACTIVE ADMISSION CURRENTLY STORED IN STATE
        admission.id ?
            //IF YES, DISPLAY DASHBOARD
            <Container className="main-container">
                <section className="admission-section">

                    <div className="left-side">
                        <div className="admission-details">
                            <h1>CURRENT STAY</h1>
                            <div className="admission-prop">Name: <span className="detail">{UserObject.fullName}</span></div>
                            <div className="admission-prop">Hospital: <span className="detail">{admission.hospitalName}</span></div>
                            <div className="admission-prop">Reason: <span className="detail">{admission.reason}</span></div>
                            <div className="admission-prop">Room #: <span className="detail">{admission.roomNum}</span></div>
                            <div className="admission-prop">Room Phone #: <span className="detail">{admission.roomPhoneNum ? admission.roomPhoneNum : "N/A"}</span></div>
                            <div className="admission-prop">Admission Date: <span className="detail">{formattedDate}</span></div>
                            <div className="admission-prop">Estimated Stay Length: <span className="detail">{admission.estimatedStayDays ? admission.estimatedStayDays + " (days)" : "N/A"}</span></div>
                            <div className="admission-prop">Nurse Shift Change: <span className="detail">{admission.nurseChangeTime ? toStandardTime(admission.nurseChangeTime) : "N/A"}</span></div>
                            <div className="admission-prop">Daily Doctor Meeting: <span className="detail">{admission.doctorMeetTime ? toStandardTime(admission.doctorMeetTime) : "N/A"}</span></div>
                        </div>
                        <div className="admission-buttons">
                            <Button className="m-1 purple-button" tag={Link} to="/admission/edit">Edit Details</Button>
                            <Button className="m-1 delete-button" color="danger" tag={Link} onClick={handleDeleteButtonClick}>Discharged</Button>
                        </div>
                    </div>

                    <div className="right-side">
                        <MedDoseTracker admissionId={admission.id} />
                    </div>

                    <div className="empty-box"></div>
                </section>

                <section className="components-section">
                    <PeopleList admissionId={admission.id} />
                    <MedicationList admissionId={admission.id} />
                    <EventList admissionId={admission.id} />
                    <QuestionList admissionId={admission.id} />
                </section>
            </Container>

            //IF NO, DISPLAY "Create Stay" button
            :
            <Container className="no-admission">
                <div className="m-auto admission-details"><strong>According to our records, you aren't currently admitted.</strong></div>
                <Button className="admission-button edit-button" tag={Link} to="/admission/create">Begin a new hospital stay</Button>
            </Container>
    )
}