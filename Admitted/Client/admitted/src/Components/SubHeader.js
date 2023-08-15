import { NavLink as RRNavLink } from "react-router-dom";
import { NavLink } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export default function SubHeader({ scrollToMain, scrollToPeople, scrollToMeds, scrollToEvents, scrollToQuestions }) {

    return (
        <div className='subheader'>
          <NavLink className='subheader-link' tag={RRNavLink} onClick={scrollToMain}>Main</NavLink>
          <NavLink className='subheader-link' tag={RRNavLink} onClick={scrollToPeople}>People</NavLink>
          <NavLink className='subheader-link' tag={RRNavLink} onClick={scrollToMeds}>Medication</NavLink>
          <NavLink className='subheader-link' tag={RRNavLink} onClick={scrollToEvents}>Events</NavLink>
          <NavLink className='subheader-link' tag={RRNavLink} onClick={scrollToQuestions}>Questions</NavLink>
        </div>
    );
}