import React from "react";
import { Admission } from "./Admission/Admission.js";

export default function Dashboard() {

  const localUser = localStorage.getItem("user");
  const UserObject = JSON.parse(localUser);

  return (
    <>
     <h1 style={{
      position: "fixed",
      left: 0,
      right: 0,
      textAlign: "center",
      fontSize: "larger",
    }}>Hello, {UserObject.fullName}
    
    {<Admission userId={UserObject.id} />}
    
    </h1>

    </>



  );
}