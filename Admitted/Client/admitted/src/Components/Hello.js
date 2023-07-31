import React from "react";

const localUser = localStorage.getItem("user");
const UserObject = JSON.parse(localUser);

export default function Hello() {
  return (
    <h1 style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      textAlign: "center",
      fontSize: "larger",
    }}>Hello, {UserObject.fullName}</h1>

    //CREATE CONDITIONAL TO CHECK IF ADMISSION WITH START DATE AND NO END DATE FOR CURRENT USER 
    //IF NO, DISPLAY "Create Stay" button
    //IF YES, DISPLAY DASHBOARD

  );
}