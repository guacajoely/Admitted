import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap"
import { addEvent } from "../../Managers/EventsManager.js";

export const EventForm = () => {

    const navigate = useNavigate();

    const {admissionId} = useParams();

    const currentDate = new Date();
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0);
    const timezoneOffset = currentDate.getTimezoneOffset() * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset)

    const [newEvent, updateNewEvent] = useState({
        eventName: "",
        eventType: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const eventToSendToAPI = {
            EventName: newEvent.eventName,
            EventType: newEvent.eventType,
            EventDateTime: correctedDate,
            AdmissionId: parseInt(admissionId)
        }

        addEvent(eventToSendToAPI)
        .then(() => {
                navigate(`/`);
        });
    };

    return (
        <form className="event-form form">
            <h2 className="event-form-title">Add an Event</h2>

                <FormGroup className="form-group">
                    <Label htmlFor="eventName">Event Description:</Label>
                    <Input
                        className="event-input med-text-input"
                        type="text"
                        id="eventName"
                        value={newEvent.eventName}
                        onChange={
                            (event) => {
                                const copy = { ...newEvent }
                                copy.eventName = event.target.value
                                updateNewEvent(copy)
                            }
                        } />
                </FormGroup>

                <FormGroup className="form-group">
                    <Label htmlFor="eventType">Type of event:</Label>
                    <Input
                        className="event-input med-text-input"
                        type="text"
                        id="eventType"
                        value={newEvent.eventType}
                        onChange={
                            (event) => {
                                const copy = { ...newEvent }
                                copy.eventType = event.target.value
                                updateNewEvent(copy)
                            }
                        } />
                </FormGroup>



            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save New Event</Button>
                <Button className="m-1" tag={Link} to="/" color="danger">Cancel</Button>
        </form>
    )




}