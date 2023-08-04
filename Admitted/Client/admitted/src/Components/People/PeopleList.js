import { Button } from "reactstrap";
import { getPeopleList } from "../../Managers/PeopleManager.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PeopleList = ({ admissionId }) => {

    const [peopleList, setPeopleList] = useState([]);

    useEffect(() => {
        getPeopleList(admissionId)
            .then((people) => setPeopleList(people));
    }, [admissionId])

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
                                <Button className="btn-sm m-1" color="danger" tag={Link} to={`/people/create/${admissionId}`}>Delete</Button>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}