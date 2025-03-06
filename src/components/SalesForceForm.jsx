import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./salesForceForm.css";
import useAuth from "../../auth/authorizer.jsx";

const SalesForceForm = () => {
  const [account, setAccount] = useState("");
  const [contact, setContact] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [telephone, setTelephone] = useState("");
  const [apiResponse, setApiResponse] = useState({ status: null, message: null });
  const [blockLogin, setBlockLogin] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    setBlockLogin(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER_AUTH}/Register`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AccountName: account,
          AccountSite: contact,
          LastName: lastName,
          FirstName: firstName,
          Email: email,
          Title: title,
          Telephone: telephone,
        }),
      });
      const responseJSON = await response.json();

      if (response.status === 200) {
        setApiResponse({ status: 'correct', message: responseJSON.message || 'ok' });
      } else if (response.status === 403) {
        setApiResponse({ status: 'error', message: responseJSON.message || 'mysterious error' });
        throw new Error(responseJSON.message);
      } else {
        setApiResponse({ status: 'network', message: 'The network failed' });
      }
    } catch (error) {
      setApiResponse({ status: 'error', message: error.message });
      console.error('There was an error!', error.message);
    } finally {
      setBlockLogin(false);
    }
  };

  const validateForm = () => {
    return account && contact && lastName && firstName && email && title && telephone;
  };

  return (
    <>
      <div className="supercontainerSalesforce">
        <div className="containerSalesforce">
          <form onSubmit={handleRegister}>
            <div className="form-containerSalesForceImg">
              <img
                src={"/static/images/Salesforcelogo.png"}
                alt="Salesforce Logo"
                className="salesforce-logo"
              />
            </div>
            <div className="form-containerSalesForce">
              <label>Account (Company Name)</label>
              <input
                maxLength={30}
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            <div className="form-containerSalesForce">
              <label>Site</label>
              <input
                maxLength={30}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="form-containerSalesForce">
              <label>Last Name</label>
              <input
                maxLength={30}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-containerSalesForce">
              <label>First Name</label>
              <input
                maxLength={30}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-containerSalesForce">
              <label>Email</label>
              <input
                type="email"
                maxLength={50}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-containerSalesForce">
              <label>Title</label>
              <input
                maxLength={50}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-containerSalesForce">
              <label>Telephone</label>
              <input
                type="tel"
                maxLength={15}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <p className="info-text">
              Please enter your Salesforce Account (Company Name) and associated Contact information so we can register you in the app.
            </p>
            <button
              type="submit"
              onClick={handleRegister}
              disabled={blockLogin || !validateForm()}
            >
              Register
            </button>
            {apiResponse.status === 'error' && <div className="api-error">{apiResponse.message}</div>}
            {apiResponse.status === 'correct' && <div className="api-ok">{apiResponse.message}</div>}
            {apiResponse.status === 'network' && <div className="api-error">{apiResponse.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SalesForceForm;