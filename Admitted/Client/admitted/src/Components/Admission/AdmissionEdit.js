import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { editAdmission, getAdmissionById } from "../../Managers/AdmissionManager.js";

export const AdmissionEdit = () => {

    const localUser = localStorage.getItem("user");
    const UserObject = JSON.parse(localUser);

    const navigate = useNavigate();

    const { admissionId } = useParams();
    
    const [editedAdmission, setEditedAdmission] = useState({
        startDateTime: "",
        reason: "",
        hospitalName: "",
        roomNum: "",
        roomPhoneNum: null,
        nurseChangeTime: null,
        doctorMeetTime: null,
        estimatedStayDays: null
    })

    useEffect(() => {
        getAdmissionById(admissionId)
        .then((res) => {
            setEditedAdmission(res)
        }
        );
    }, [admissionId])
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
            EndDateTime: editedAdmission.endDateTime,
            UserId: UserObject.id
        }

        return editAdmission(admissionToEdit)
            .then(() => {
                if(editedAdmission.endDateTime){
                    navigate(`/admission/${editedAdmission.id}`)
                }
                else{
                    navigate(`/`)
                }

            })
    }

    return (

        <form className="admission-form form">
            <h2 className="admission-form-title">Edit your stay details</h2>
            <div style={{fontSize:".9em", marginBottom:"1em"}}>(If something is unknown you can leave the field blank)</div>

            <FormGroup className="form-group">
                    <Label htmlFor="startDateTime">Admission Date</Label>
                    <Input
                        className="event-input datetime-input"
                        type="datetime-local"
                        id="startDateTime"
                        value={editedAdmission.startDateTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.startDateTime = event.target.value
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="reason">Reason:</Label>
                    <Input
                        className="admission-input med-text-input input"
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
                        className="admission-input med-text-input input"
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
                        className="admission-input number-input"
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
                        className="admission-input phone-input input"
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
                        className="admission-input time-input"
                        type="time"
                        id="nurseChangeTime"
                        value={editedAdmission.nurseChangeTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.nurseChangeTime = event.target.value
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="doctorMeetTime">Is there a specific time you can expect to speak to your doctor/s daily?</Label>
                    <Input
                        className="admission-input time-input"
                        type="time"
                        id="doctorMeetTime"
                        value={editedAdmission.doctorMeetTime}
                        onChange={
                            (event) => {
                                const copy = { ...editedAdmission }
                                copy.doctorMeetTime = event.target.value
                                setEditedAdmission(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="estimatedStayDays">Estimated Stay Length (days)</Label>
                    <Input
                        className="admission-input number-input"
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
                <Button className="m-1" tag={Link} to="/" color="danger">Cancel</Button>
        </form>
    );
}