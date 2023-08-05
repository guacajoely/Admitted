import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent, getEventList } from "../../Managers/EventsManager.js";

export const EventList = ({ admissionId }) => {

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        getEventList(admissionId)
            .then((events) => setEventList(events));
    }, [admissionId])

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this event?'))
        const [, eventId] = event.target.id.split("--")
        const parsedId = parseInt(eventId)

        if (results) {
            deleteEvent(parsedId)
                .then(getEventList(admissionId))
                .then((events) => setEventList(events))
        };
    };

    return (
        
        <div className="events-section">
            <h1>Events <Button className="btn-sm m-1" color="primary" tag={Link} to={`/events/create/${admissionId}`}>Add an Event</Button></h1>

            <table className="events-table">
                <thead>
                    <tr>
                        <th style={{width: "25%"}}>Date</th>
                        <th style={{width: "25%"}}>Event</th>
                        <th style={{width: "25%"}}>Type</th>
                        <th classname="button-column"></th>
                    </tr>
                </thead>

                <tbody>

                    {eventList.map((event) => {

                        const formattedDate = new Date(event.eventDateTime).toLocaleDateString();

                        return (
                            <tr key={event.id}>
                                <td>{formattedDate}</td>
                                <td>{event.eventName}</td>
                                <td>{event.eventType}</td>
                                <td classname="button-column">
                                <Button className="btn-sm m-1" tag={Link} to={`/events/edit/${event.id}`}>Edit</Button>
                                <Button className="btn-sm m-1" color="danger" onClick={handleDeleteButton} id={`event--${event.id}`} >Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}