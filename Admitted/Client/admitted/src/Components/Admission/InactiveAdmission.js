import { Link, useParams } from "react-router-dom";
import { getAdmissionById } from "../../Managers/AdmissionManager.js";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import { PeopleList } from "../People/PeopleList.js";
import { MedicationList } from "../Medication/MedicationList.js";
import { EventList } from "../Events/EventList.js";
import { QuestionList } from "../Questions/QuestionList.js";

export const InactiveAdmission = () => {

    const { admissionId } = useParams();

    const [inactiveAdmission, setInactiveAdmission] = useState([]);

    useEffect(() => {
        getAdmissionById(admissionId)
            .then((admission) => setInactiveAdmission(admission));
    }, [admissionId])

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

    //format start date
    const AdmissionStartDateObject = new Date(inactiveAdmission.startDateTime);
    const formattedStartDate = AdmissionStartDateObject.toLocaleDateString();

    //format end date
    const AdmissionEndDateObject = new Date(inactiveAdmission.endDateTime);
    const formattedEndDate = AdmissionEndDateObject.toLocaleDateString();

    //get # of days between start and end

      
    // To calculate the time difference of two dates
    const differenceInTime = AdmissionEndDateObject.getTime() - AdmissionStartDateObject.getTime();
      
    // To calculate the no. of days between two dates
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      



    function toStandardTime(militaryTime) {
        militaryTime = militaryTime.split(':');
        return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ' PM' : militaryTime.join(':') + ' AM'
    }

    return (

        //CHECK IF THERE IS AN ACTIVE ADMISSION CURRENTLY STORED IN STATE
        inactiveAdmission.id ?
            //IF YES, DISPLAY DASHBOARD
            <Container className="main-container">
                <section className="admission-section">

                    <div className="left-side">
                        <div className="admission-details">
                            <h1>Previous Admission</h1>
                            <div className="admission-prop">Name: <span className="detail">{UserObject.fullName}</span></div>
                            <div className="admission-prop">Hospital: <span className="detail">{inactiveAdmission.hospitalName}</span></div>
                            <div className="admission-prop">Reason: <span className="detail">{inactiveAdmission.reason}</span></div>
                            <div className="admission-prop">Start Date: <span className="detail">{formattedStartDate}</span></div>
                            <div className="admission-prop">End Date: <span className="detail">{formattedEndDate}</span></div>
                            <div className="admission-prop">Stay Length: <span className="detail">{differenceInDays} days</span></div>
                        </div>
                        <div className="admission-buttons">
                            <Button className="m-1 purple-button" tag={Link} to={`/admission/edit/${inactiveAdmission.id}`}>Edit Details</Button>
                        </div>
                    </div>

                    <div className="right-side">
                        <></>
                    </div>

                    <div className="empty-box"></div>
                </section>

                <section className="components-section">
                    <PeopleList admissionId={inactiveAdmission.id} />
                    <MedicationList admissionId={inactiveAdmission.id} />
                    <EventList admissionId={inactiveAdmission.id} />
                    <QuestionList admissionId={inactiveAdmission.id} />
                </section>
            </Container>

            //IF NO, DISPLAY "No Previous Admissions" text
            :
            <Container className="no-admission">
                <div className="m-auto admission-details"><strong>According to our records, you don't have any previous admissions.</strong></div>
            </Container>
    )
}