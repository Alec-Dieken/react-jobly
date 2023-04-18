import React from "react";
import { Link } from "react-router-dom";
import "./styles/listItem.css";

const JobListItem = ({ job }) => {
  return (
    <li className="listItem">
      <Link to={`/jobs/${job.id}`}>
        <div>
          <h4>{job.title}</h4>
          <h6>Company: {job.companyName}</h6>
          {job.salary && <p>Salary: {job.salary}</p>}
          {job.equity && <p>Equity: {job.equity}</p>}
        </div>
      </Link>
    </li>
  );
};

export default JobListItem;
