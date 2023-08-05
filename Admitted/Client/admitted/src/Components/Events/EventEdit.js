import { useEffect, useState } from "react"
import { editPerson, getPersonById } from "../../Managers/PeopleManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { editEvent, getEventById } from "../../Managers/EventsManager.js";

export const EventEdit = () => {

    const [editedEvent, setEditedEvent] = useState({
        eventName: "",
        eventType: ""
    })

    const {eventId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getEventById(eventId).then((res) => {
            setEditedEvent(res)
        }
        );
    }, [eventId])


    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const eventToEdit = {
            Id: editedEvent.id,
            EventName: editedEvent.eventName,
            EventType: editedEvent.eventType,
            EventDateTime: editedEvent.eventDateTime,
            AdmissionId: editedEvent.admissionId
        }

        return editEvent(eventToEdit)
            .then(() => {
                navigate(`/`)
            })
    }


    return (
        <form className="event-form">
            <h2 className="event-form-title">Edit Event</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="eventName">Event Description:</Label>
                    <Input
                        className="event-input"
                        type="text"
                        id="eventName"
                        value={editedEvent.eventName}
                        onChange={
                            (event) => {
                                const copy = { ...editedEvent }
                                copy.eventName = event.target.value
                                setEditedEvent(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="eventType">Type of event:</Label>
                    <Input
                        className="event-input"
                        type="text"
                        id="eventType"
                        value={editedEvent.eventType}
                        onChange={
                            (event) => {
                                const copy = { ...editedEvent }
                                copy.eventType = event.target.value
                                setEditedEvent(copy)
                            }
                        } />
                </FormGroup>



            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Event</Button>
        </form>
    )


}