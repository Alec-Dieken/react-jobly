import React from "react";
import { Link } from "react-router-dom";
import "./styles/listItem.css";

const CompanyListItem = ({ company }) => {
  return (
    <li className="listItem">
      <Link to={`/companies/${company.handle}`}>
        <div>
          <h4>{company.name}</h4>
          <h6>{company.description}</h6>
          <p># of Employees: {company.numEmployees}</p>
        </div>
      </Link>
    </li>
  );
};

export default CompanyListItem;
