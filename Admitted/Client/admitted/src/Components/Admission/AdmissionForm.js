import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, FormGroup, Input, Label } from "reactstrap"
import { addAdmission } from "../../Managers/AdmissionManager.js"

export const AdmissionForm = () => {

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

    const navigate = useNavigate();

    const currentDate = new Date();
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0);
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const [newAdmission, updateAdmission] = useState({
        reason: "",
        hospitalName: "",
        roomNum: "",
        roomPhoneNum: null,
        nurseChangeTime: null,
        doctorMeetTime: null,
        estimatedStayDays: null
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const admissionToSendToAPI = {
            Reason: newAdmission.reason,
            HospitalName: newAdmission.hospitalName,
            RoomNum: newAdmission.roomNum,
            RoomPhoneNum: newAdmission.roomPhoneNum,
            NurseChangeTime: newAdmission.nurseChangeTime,
            DoctorMeetTime: newAdmission.doctorMeetTime,
            EstimatedStayDays: newAdmission.estimatedStayDays,
            StartDateTime: correctedDate.toISOString(),
            EndDateTime: null,
            UserId: UserObject.id
        }

        addAdmission(admissionToSendToAPI)
        .then(() => {
                navigate(`/`);
        });
    };

    

    return (
        <form className="admission-form form">
            <h2 className="admission-form-title">Create a New Stay</h2>
            <h5>Note: If something is unknown, just leave the input field blank.</h5>

                <FormGroup className="form-group">
                    <Label htmlFor="reason">Reason:</Label>
                    <Input
                        className="admission-input med-text-input input"
                        type="text"
                        id="reason"
                        value={newAdmission.reason}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.reason = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="hospitalName">Hospital Name:</Label>
                    <Input
                        className="admission-input med-text-input input"
                        type="text"
                        id="hospitalName"
                        value={newAdmission.hospitalName}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.hospitalName = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="roomNum">Room #:</Label>
                    <Input
                        className="admission-input number-input"
                        type="number"
                        id="roomNum"
                        value={newAdmission.roomNum}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.roomNum = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="roomPhoneNum">Room Phone #:</Label>
                    <Input
                        className="admission-input phone-input input"
                        type="tel"
                        id="roomPhoneNum"
                        value={newAdmission.roomPhoneNum}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.roomPhoneNum = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="nurseChangeTime">Is there a specific time nurses change shifts every day?</Label>
                    <Input
                        className="admission-input time-input"
                        type="time"
                        id="nurseChangeTime"
                        value={newAdmission.nurseChangeTime}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.nurseChangeTime = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="doctorMeetTime">Is there a specific time you can expect to speak to your doctor/s daily?</Label>
                    <Input
                        className="admission-input time-input"
                        type="time"
                        id="doctorMeetTime"
                        value={newAdmission.doctorMeetTime}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.doctorMeetTime = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="estimatedStayDays">Estimated Stay Length (days)</Label>
                    <Input
                        className="admission-input number-input"
                        type="number"
                        id="estimatedStayDays"
                        value={newAdmission.estimatedStayDays}
                        onChange={
                            (event) => {
                                const copy = { ...newAdmission }
                                copy.estimatedStayDays = event.target.value
                                updateAdmission(copy)
                            }
                        } />
                </FormGroup>

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Admission</Button>
        </form>
    )
}   