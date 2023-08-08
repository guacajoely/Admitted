import { useEffect, useState } from "react";
import { getMedList, getMedicationById } from "../../Managers/MedicationManager.js";
import { FormGroup, Input, Label } from "reactstrap";
import { getMedDoseList } from "../../Managers/MedDoseManager.js";

export const MedDoseTracker = ({admissionId}) => {

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

    let lastDose, lastDoseDateObject, lastDoseHour, nextDoseTime, formattedNextDose, nextDoseDateObject, nextDoseString

    if(medDoseList.length > 0){

        lastDose = medDoseList[medDoseList.length - 1]
    
        //get last dose as date
        lastDoseDateObject = new Date(lastDose.doseDateTime);
        lastDoseHour = lastDoseDateObject.getHours();
        console.log(lastDoseHour)

        //add the doseFrequency to the hours of that date object and return it as the nextDoseTime
        
        nextDoseDateObject = new Date(lastDoseDateObject.setHours((lastDoseHour + currentMed.frequencyHours)))
    
        nextDoseString = nextDoseDateObject.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        console.log(nextDoseString)
    
    }
   
    return (

        
        
        <div className="med-tracker">
            <h3>Medication Tracker</h3>

            {medList.length > 0 ?

                <FormGroup>
                    <Label for="medicationDropdown">Select Medication:</Label>
                    <Input
                        className="post-input"
                        type="select"
                        name="medication"
                        id="medicationDropdown"
                        value={selectedMed.id}
                        onChange={(event) => {
                            const copy = {...selectedMed} 
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

            : <></>
        }
        
        {medDoseList.length > 0 ? <div>You can request another dose <br></br> {nextDoseString}</div> : <></>}

        </div>
    )
}





