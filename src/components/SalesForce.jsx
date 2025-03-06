import React from 'react';
import Cookies from "js-cookie";
import './Salesforce.css';

const Salesforce = () => {
  const urlText = `${import.meta.env.VITE_API_URL_SALES_FORCE}/auth`; 

  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = urlText;
  };

  return (
    <div className="SuperSalesForcecontainer">
      <div className="SalesForceContainer">
        <h2>Join Our App, Hosted on Salesforce</h2>
        <button onClick={handleClick} className="joinButton">
          Join with Salesforce
        </button>
        <p className="info-text">
          Salesforce is a leading cloud-based software company specializing in customer relationship management (CRM). They offer a variety of tools to help businesses manage their sales, customer service, marketing, and more.
          To learn more and explore career opportunities, visit the <a href="https://www.salesforce.com" target="_blank" rel="noopener noreferrer">Salesforce website</a> for more information.
        </p>
      </div>
    </div>
  );
};

export default Salesforce;