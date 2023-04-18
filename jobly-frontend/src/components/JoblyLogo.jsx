import React from 'react';
import { Link } from 'react-router-dom';
import './styles/JoblyLogo.css';

const JoblyLogo = () => {
  return (
    <header>
      <h1>
        <Link to="/">
          Jobly
        </Link>
      </h1>
    </header>
  );
};

export default JoblyLogo;
