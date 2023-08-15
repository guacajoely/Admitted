import { Link, useParams } from "react-router-dom";
import { getAdmissionById } from "../../Managers/AdmissionManager.js";
import { useEffect, useRef, useState } from "react";
import { Button, Container } from "reactstrap";
import { PeopleList } from "../People/PeopleList.js";
import { MedicationList } from "../Medication/MedicationList.js";
import { EventList } from "../Events/EventList.js";
import { QuestionList } from "../Questions/QuestionList.js";
import SubHeader from "../SubHeader.js";

export const InactiveAdmission = () => {

    const { admissionId } = useParams();

    const [inactiveAdmission, setInactiveAdmission] = useState([]);

    useEffect(() => {
        getAdmissionById(admissionId)
            .then((admission) => setInactiveAdmission(admission));
    }, [admissionId])

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

     //SUB-HEADER SCROLL TO SECTIONS FUNCTIONALITY
     const mainRef = useRef(null);
     const peopleRef = useRef(null);
     const medsRef = useRef(null);
     const eventsRef = useRef(null);
     const questionsRef = useRef(null);
 
     const scrollToMain = () => mainRef.current.scrollIntoView({ behavior: "smooth" });
     const scrollToPeople = () => peopleRef.current.scrollIntoView({ behavior: "smooth" });
     const scrollToMeds = () => medsRef.current.scrollIntoView({ behavior: "smooth" });
     const scrollToEvents = () => eventsRef.current.scrollIntoView({ behavior: "smooth" });
     const scrollToQuestions = () => questionsRef.current.scrollIntoView({ behavior: "smooth" });

    //format start date
    const AdmissionStartDateObject = new Date(inactiveAdmission.startDateTime);
    const formattedStartDate = AdmissionStartDateObject.toLocaleDateString();

    //format end date
    const AdmissionEndDateObject = new Date(inactiveAdmission.endDateTime);
    const formattedEndDate = AdmissionEndDateObject.toLocaleDateString();

    //get # of days between start and end
    //calculate time difference of two dates
    const differenceInTime = AdmissionEndDateObject.getTime() - AdmissionStartDateObject.getTime();
      
    //calculate the no. of days between those two dates
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    return (

        //CHECK IF THERE IS AN ACTIVE ADMISSION CURRENTLY STORED IN STATE
        inactiveAdmission.id ?
            //IF YES, DISPLAY DASHBOARD
            <>
            <SubHeader scrollToPeople={scrollToPeople} 
                scrollToMeds={scrollToMeds}
                scrollToEvents={scrollToEvents}
                scrollToQuestions={scrollToQuestions}
                scrollToMain={scrollToMain}
            />

        

            <Container className="main-container">
                {/* scroll margin is 1000px just so goes to top of page, not just top of section */}
                <section className="admission-section" style={{scrollMargin: "1000px"}} ref={mainRef}>

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
                        <div style={{scrollMargin: "60px"}} ref={peopleRef}>
                            <PeopleList admissionId={inactiveAdmission.id} />
                        </div>
                        <div style={{scrollMargin: "60px"}} ref={medsRef}>
                            <MedicationList admissionId={inactiveAdmission.id} />
                        </div>
                        <div style={{scrollMargin: "60px"}} ref={eventsRef}>
                            <EventList admissionId={inactiveAdmission.id} />
                        </div>
                        <div style={{scrollMargin: "60px"}} ref={questionsRef}>
                            <QuestionList admissionId={inactiveAdmission.id} />
                        </div>
                    </section>
            </Container>
            </>

            //IF NO, DISPLAY "No Previous Admissions" text
            :
            <Container className="no-admission">
                <div className="m-auto admission-details"><strong>According to our records, you don't have any previous admissions.</strong></div>
            </Container>
    )
}