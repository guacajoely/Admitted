import React from "react";
import { Admission } from "../Admission/Admission.js";
import "./Dashboard.css"

export default function Dashboard() {

  const localUser = localStorage.getItem("user");
  const UserObject = JSON.parse(localUser);

  return (
    <>
    
    {<Admission userId={UserObject.id} />}
    
    </>



  );
}