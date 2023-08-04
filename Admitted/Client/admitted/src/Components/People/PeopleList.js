import { getPeopleList } from "../../Managers/PeopleManager.js";
import { useEffect, useState } from "react";

export const PeopleList = ({ admissionId }) => {

    const [peopleList, setPeopleList] = useState([]);

    useEffect(() => {
        getPeopleList(admissionId)
            .then((people) => setPeopleList(people));
    }, [admissionId])

    console.log(peopleList)

}