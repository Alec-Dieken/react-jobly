import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CardLink.css';

const CardLink = ({ img, loc, title }) => {
    return (
        <Link to={loc} className="cardLink">
            <div className="cardLink-inner">
                <h3>{title}</h3>
                <img src={img} alt={title + " icon"} />
            </div>
        </Link>
    );
};

export default CardLink;

