export const About = () => {

    return (
        <container className="about-section">
            <div className="about-text">
            <h1 style={{marginBottom: "1em"}}>About Admitted</h1>
                This app is meant to help you keep track of information important to you or a loved one during a hospital stay.<br></br><br></br>
                It is split into 4 main categories:<br></br><br></br>
                <span style={{fontSize: "1.5em"}}>People</span> – Anyone you want to keep in mind. This may be just your main doctors, or maybe you want to remember all your nurses names and what days they were assigned to you.<br></br><br></br>
                <span style={{fontSize: "1.5em"}}>Medication</span> – You can use this section to input a single medication that can then be tracked in the main hub so you know when you can request it again, OR you can track a full list of all the medications you’ve taken during your stay.<br></br><br></br>
                <span style={{fontSize: "1.5em"}}>Events</span> – This section has been left fairly open-ended on purpose since what is tracked here will vary significantly based on the reason for your hospitalization. Ideally, this is a place for you to record any occurrences important to you. Examples include: Tests, Surgeries/Procedures, Symptoms, Pain Level, Movement, Diet, and Bathroom Activity.<br></br><br></br>
                <span style={{fontSize: "1.5em"}}>Questions</span> – Questions for your doctor, nurse, or family. Initially you will only record a question. Then, when you are able to ask it, you can record the response.<br></br><br></br>
                When you initially record any item, the current date and time is automatically recorded along with it. However, If you wish to change this, all you have to do is click the edit button and change the date/time on the form.<br></br><br></br>
                By clicking on the “Dose History” button beside a medication, you can track the doses of that medication. Note: if you delete a medication from the medication list, it will also delete your dose history for that medication!
            </div>
        </container>
    )
}