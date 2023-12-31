import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import { AdmissionForm } from "./Admission/AdmissionForm.js";
import { AdmissionEdit } from "./Admission/AdmissionEdit.js";
import { PersonForm } from "./People/PersonForm.js";
import { PersonEdit } from "./People/PersonEdit.js";
import { MedicationForm } from "./Medication/MedicationForm.js";
import { MedicationEdit } from "./Medication/MedicationEdit.js";
import { EventForm } from "./Events/EventForm.js";
import { EventEdit } from "./Events/EventEdit.js";
import { QuestionForm } from "./Questions/QuestionForm.js";
import { QuestionEdit } from "./Questions/QuestionEdit.js";
import { MedDoseList } from "./MedDose/MedDoseList.js";
import { MedDoseEdit } from "./MedDose/MedDoseEdit.js";
import { About } from "./About.js";
import { InactiveList } from "./Admission/InactiveList.js";
import { InactiveAdmission } from "./Admission/InactiveAdmission.js";

export default function ApplicationViews({ setInactiveAdmissions }) {

 return(
      <Routes>
        <Route path="/" element={<Dashboard setInactiveAdmissions={setInactiveAdmissions}/>} />
        <Route path="/admission/create" element={<AdmissionForm />} />
        <Route path="/admission/edit/:admissionId" element={<AdmissionEdit />} />
        <Route path="/people/create/:admissionId" element={<PersonForm />} />
        <Route path="/people/edit/:personId" element={<PersonEdit />} />
        <Route path="/medication/create/:admissionId" element={<MedicationForm />} />
        <Route path="/medication/edit/:medId" element={<MedicationEdit />} />
        <Route path="/events/create/:admissionId" element={<EventForm />} />
        <Route path="/events/edit/:eventId" element={<EventEdit />} />
        <Route path="/questions/create/:admissionId" element={<QuestionForm />} />
        <Route path="/questions/edit/:questionId" element={<QuestionEdit />} />
        <Route path="/medDose/:medId" element={<MedDoseList />} />
        <Route path="/medDose/edit/:doseId" element={<MedDoseEdit />} />
        <Route path="/about" element={<About />} />
        <Route path="/history/:userId" element={<InactiveList />} />
        <Route path="/admission/:admissionId" element={<InactiveAdmission />} />
      </Routes>
   );
 
}