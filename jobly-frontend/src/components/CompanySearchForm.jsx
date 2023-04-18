import React, { useState } from 'react';
import "./styles/searchform.css";

const CompanySearchForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [minEmployees, setMinEmployees] = useState('');
  const [maxEmployees, setMaxEmployees] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, minEmployees, maxEmployees });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by company name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min number of employees"
        value={minEmployees}
        onChange={(e) => setMinEmployees(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max number of employees"
        value={maxEmployees}
        onChange={(e) => setMaxEmployees(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default CompanySearchForm;
