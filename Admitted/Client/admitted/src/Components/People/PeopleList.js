import { Button } from "reactstrap";
import { deletePerson, getPeopleList } from "../../Managers/PeopleManager.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PeopleList = ({ admissionId }) => {

    const [peopleList, setPeopleList] = useState([]);

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
                .then((people) => setPeopleList(people));
        };
    };

    return (

        <div className="people-section">
            <h1>People <Button className="btn-sm m-1" color="primary" tag={Link} to={`/people/create/${admissionId}`}>Add a Person</Button></h1>

            {peopleList.length > 0 ?


                <table className="people-table">
                    <thead>
                        <tr>
                            <th style={{ width: "25%" }}>Name</th>
                            <th style={{ width: "25%" }}>Title</th>
                            <th style={{ width: "25%" }}>Date Met</th>
                            <th className="button-column"></th>
                        </tr>
                    </thead>
                    <tbody>


                        {peopleList.map((person) => {

                            const formattedDateTime = new Date(person.meetDateTime).toLocaleString(undefined, {
                                month: 'long',
                                day: 'numeric'
                            });

                            return (
                                <tr key={person.id}>
                                    <td>{person.staffName}</td>
                                    <td>{person.staffTitle}</td>
                                    <td>{formattedDateTime}</td>
                                    <td className="button-column">
                                        <Button className="btn-sm m-1" tag={Link} to={`/people/edit/${person.id}`}>Edit</Button>
                                        <Button id={`person--${person.id}`} className="btn-sm m-1" color="danger" tag={Link} onClick={handleDeleteButton}>Delete</Button>
                                    </td>
                                </tr>


                            )
                        })}

                    </tbody>
                </table>

                : <div></div>

            }

        </div>
    )
}