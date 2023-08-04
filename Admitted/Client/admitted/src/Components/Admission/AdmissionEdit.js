import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { editAdmission, getActiveAdmission } from "../../Managers/AdmissionManager.js";

export const AdmissionEdit = () => {

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

    const navigate = useNavigate();
    
    const [editedAdmission, setEditedAdmission] = useState({
        reason: "",
        hospitalName: "",
        roomNum: "",
        roomPhoneNum: null,
        nurseChangeTime: null,
        doctorMeetTime: null,
        estimatedStayDays: null
    })

    useEffect(() => {
        getActiveAdmission(UserObject.id).then((res) => {
            setEditedAdmission(res)
        }
        );
    }, [UserObject.id])
    if (!editedAdmission) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const admissionToEdit = {
            Id: editedAdmission.id,
            Reason: editedAdmission.reason,
            HospitalName: editedAdmission.hospitalName,
            RoomNum: editedAdmission.roomNum,
            RoomPhoneNum: editedAdmission.roomPhoneNum,
            NurseChangeTime: editedAdmission.nurseChangeTime,
            DoctorMeetTime: editedAdmission.doctorMeetTime,
            EstimatedStayDays: editedAdmission.estimatedStayDays,
            StartDateTime: editedAdmission.startDateTime,
            EndDateTime: null,
            UserId: UserObject.id
        }

        return editAdmission(admissionToEdit)
            .then(() => {
                navigate(`/`)
            })
    }
   


    return (

        <form className="admission-form">
            <h2 className="admission-form-title">Edit your stay details</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="reason">Reason:</Label>
                    <Input
                        className="admission-input"
                        type="text"
                        id="reason"
                        value={editedAdmission.reason}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.reason = event.target.value
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="hospitalName">Hospital Name:</Label>
                    <Input
                        className="admission-input"
                        type="text"
                        id="hospitalName"
                        value={editedAdmission.hospitalName}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.hospitalName = event.target.value
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="roomNum">Room #:</Label>
                    <Input
                        className="admission-input"
                        type="number"
                        id="roomNum"
                        value={editedAdmission.roomNum}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.roomNum = parseInt(event.target.value)
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="roomPhoneNum">Room Phone #:</Label>
                    <Input
                        className="admission-input"
                        type="text"
                        id="roomPhoneNum"
                        value={editedAdmission.roomPhoneNum}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.roomPhoneNum = event.target.value
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="nurseChangeTime">Is there a specific time nurses change shifts every day?</Label>
                    <Input
                        className="admission-input"
                        type="number"
                        id="nurseChangeTime"
                        value={editedAdmission.nurseChangeTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.nurseChangeTime = parseInt(event.target.value)
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="doctorMeetTime">Is there a specific time you can expect to speak to your doctor/s daily?</Label>
                    <Input
                        className="admission-input"
                        type="number"
                        id="doctorMeetTime"
                        value={editedAdmission.doctorMeetTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.doctorMeetTime = parseInt(event.target.value)
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="estimatedStayDays">Estimated Stay Length (days)</Label>
                    <Input
                        className="admission-input"
                        type="number"
                        id="estimatedStayDays"
                        value={editedAdmission.estimatedStayDays}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.estimatedStayDays = parseInt(event.target.value)
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Details</Button>
        </form>
    );
}