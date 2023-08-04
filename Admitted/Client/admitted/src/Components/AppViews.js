import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import { AdmissionForm } from "./Admission/AdmissionForm.js";
import { AdmissionEdit } from "./Admission/AdmissionEdit.js";
import { PersonForm } from "./People/PersonForm.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admission/create" element={<AdmissionForm />} />
        <Route path="/admission/edit" element={<AdmissionEdit />} />
        <Route path="/people/create/:admissionId" element={<PersonForm />} />
      </Routes>
   );
 
}