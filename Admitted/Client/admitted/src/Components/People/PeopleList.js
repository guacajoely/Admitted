import { Button } from "reactstrap";
import { deletePerson, getPeopleList } from "../../Managers/PeopleManager.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const PeopleList = ({ admissionId }) => {

    const [peopleList, setPeopleList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getPeopleList(admissionId)
            .then((people) => setPeopleList(people));
    }, [admissionId])

    const handleDeleteButton = (event) => {
        event.preventDefault();
        const results = (window.confirm('Are you sure you want to delete this person?'))
        const [, personId] = event.target.id.split("--")
        const parsedId = parseInt(personId)

        if (results) {
            deletePerson(parsedId)
                .then(getPeopleList(admissionId))
                .then(navigate(`/`))
                window.location.reload()

        };
    };

    return (
        
        <div className="people-section">
            <h1>People</h1>

            <Button className="btn-sm" tag={Link} to={`/people/create/${admissionId}`}>Add a Person</Button>

            <table className="people-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Date Met</th>
                    </tr>
                </thead>

                <tbody>

                    {peopleList.map((person) => {

                        const formattedDate = new Date(person.meetDateTime).toLocaleDateString();

                        return (
                            <tr key={person.id}>
                                <td>{person.staffName}</td>
                                <td>{person.staffTitle}</td>
                                <td>{formattedDate}</td>
                                <Button className="btn-sm m-1" tag={Link} to={`/people/edit/${person.id}`}>Edit</Button>
                                <Button id={`person--${person.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}