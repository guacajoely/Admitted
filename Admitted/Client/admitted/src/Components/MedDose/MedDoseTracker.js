import { useEffect, useState } from "react";
import { getMedList, getMedicationById } from "../../Managers/MedicationManager.js";
import { FormGroup, Input, Label } from "reactstrap";
import { getMedDoseList } from "../../Managers/MedDoseManager.js";

export const MedDoseTracker = ({ admissionId }) => {

    const [medList, setMedList] = useState([]);
    const [selectedMed, setSelectedMed] = useState([]);
    const [currentMed, setCurrentMed] = useState([]);
    const [medDoseList, setMedDoseList] = useState([]);

    useEffect(() => {
        getMedList(admissionId)
            .then((meds) => setMedList(meds));
    }, [admissionId])

    useEffect(() => {
        getMedDoseList(selectedMed.id)
            .then((meds) => setMedDoseList(meds));
    }, [selectedMed.id])

    useEffect(() => {
        getMedicationById(selectedMed.id)
            .then((medication) => setCurrentMed(medication));
    }, [selectedMed.id])

    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedCurrentDateTime = new Date(currentDate.getTime() - timezoneOffset)

    let lastDose, lastDoseDateObject, lastDoseHour, nextDoseDateObject, nextDoseTimeString, lastDoseTimeString

    if (medDoseList.length > 0) {

        lastDose = medDoseList[medDoseList.length - 1]

        //get last dose as Date object
        lastDoseDateObject = new Date(lastDose.doseDateTime);
        lastDoseHour = lastDoseDateObject.getHours();

        //add the doseFrequency to the hours of that date object and return it as the next dose
        nextDoseDateObject = new Date(lastDoseDateObject)
        let newHours = lastDoseHour + currentMed.frequencyHours

        //set hours to correct time and increase date by 1 if going into following day
        if (newHours > 24) {
            newHours = newHours - 24
            nextDoseDateObject.setDate(nextDoseDateObject.getDate() + 1);
        }
        nextDoseDateObject.setHours(newHours)

        lastDoseTimeString = lastDoseDateObject.toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });

        nextDoseTimeString = nextDoseDateObject.toLocaleString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });

    }

    return (

        <>

            {medList.length > 0 ?

                <div className="med-tracker">
                    <h3>Medication Tracker</h3>

                    <FormGroup>
                        <Label for="medicationDropdown">Select Medication:</Label>
                        <Input
                            className="post-input"
                            type="select"
                            name="medication"
                            id="medicationDropdown"
                            value={selectedMed.id}
                            onChange={(event) => {
                                const copy = { ...selectedMed }
                                copy.id = event.target.value
                                setSelectedMed(copy)
                            }}
                        >
                            <option value="">Select...</option>
                            {medList.map((medication) => (
                                <option key={medication.id} value={medication.id}>{medication.medicationName}</option>
                            ))}
                        </Input>
                    </FormGroup>


                    {currentMed.id ?

                        (medDoseList.length > 0) ?
                            <div className="dose-response">
                                <div className="dose-response">Your last dose of {currentMed.medicationName} was at {lastDoseTimeString}</div>

                                <div className="dose-response">You can request another dose <br></br>

                                    {(nextDoseDateObject > correctedCurrentDateTime) ?
                                        <span className="tracker-time">at {nextDoseTimeString}</span>
                                        :
                                        <span className="tracker-time">now</span>}

                                </div>
                            </div>

                            :
                            <div>Please add a dose to this medication's dose <br></br> history in order to track your next available.</div>

                        :

                        <></>

                    }

                </div>

                : <></>
            }


        </>
    )
}





