import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AdmissionForm } from "./Admission/AdmissionForm.js";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admission/create" element={<AdmissionForm />} />
      </Routes>
   );
 
}