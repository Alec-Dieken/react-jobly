import React, { useState } from 'react';
import './styles/searchform.css';

const JobSearchForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [hasEquity, setHasEquity] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, minSalary, hasEquity });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by job title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minimum Salary..."
        value={minSalary}
        onChange={(e) => setMinSalary(e.target.value)}
      />
      <label htmlFor="hasEquity">
        Has equity
        <input
          type="checkbox"
          id="hasEquity"
          checked={hasEquity}
          onChange={(e) => setHasEquity(e.target.checked)}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default JobSearchForm;
