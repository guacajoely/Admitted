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
                .then(() => getEventList(admissionId))
                .then((events) => setEventList(events))
        };
    };

    return (

        <div className="events-section">
            <h1>Events <Button className="btn-sm m-1 add-button" color="primary" tag={Link} to={`/events/create/${admissionId}`}>Add an Event</Button></h1>


            {eventList.length > 0 ?

                <table className="events-table">
                    <thead>
                        <tr>
                            <th style={{ maxWidth: "20%" }}>Date</th>
                            <th style={{ maxWidth: "25%" }}>Event</th>
                            <th style={{ maxWidth: "15%" }}>Type</th>
                            <th style={{ width: "150px" }} className="button-column"></th>
                        </tr>
                    </thead>

                    <tbody>

                        {eventList.map((event) => {

                            const formattedDate = new Date(event.eventDateTime).toLocaleString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <tr key={event.id}>
                                    <td>{formattedDate}</td>
                                    <td>{event.eventName}</td>
                                    <td>{event.eventType}</td>
                                    <td className="button-column">
                                        <Button className="btn-sm m-1 edit-button" tag={Link} to={`/events/edit/${event.id}`}>Edit</Button>
                                        <Button className="btn-sm m-1 delete-button" color="danger" onClick={handleDeleteButton} id={`event--${event.id}`} >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>


                : <></>
            }

        </div>
    )
}