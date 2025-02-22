import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./login.css";
import useAuth from "../../auth/authorizer.jsx";
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({ status: null, message: null })
  const [blockLogin, setBlockLogin]= useState(false)
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();
  const [cookies, setCookie] = useCookies(['user']);

  const handleLogin = async (e) => {
    e.preventDefault();
    setBlockLogin(true)
    console.log(import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_2}/login`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      var responseJSON = await response.json();
      console.log(responseJSON)
      if (response.status == "200") {
        setApiResponse({ status: 'correct', message: responseJSON.message || 'ok' })
        login().then(() => {
          navigate(state?.path || "/dashboard");
        });
        
      }
      else if (response.status == '403') {
        setApiResponse({ status: 'error', message: responseJSON.message || 'mysterious error' })
        throw new Error(responseJSON.message);
    }
    else{
      setApiResponse({status:'network', message:'The network failed'})
  }

} catch (error) {
            setApiResponse({ status: 'error', message: error.message})
            console.error('There was an error!', error.message);
}finally{
  setBlockLogin(false)
}
  };

  const validateForm = () => {
    return email && password;
  };
  return (
    <>
    <div className="supercontainer">
        <div className="container">
            <form onSubmit={handleLogin}>
            <div className="form-container2">
              <h2>Log in</h2>
              <img src={"/static/images/pencilLogo.png"}
                alt="Description of Image"
              />
            </div>
            <div className="form-container">
              <label>Email</label>
              <input
                maxLength={30}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>

            <div className="form-container">
              <label>Password</label>
              <input
                maxLength={30}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              disabled={blockLogin||!validateForm()}
            >
              Log in
            </button>
            {apiResponse.status == 'error' && <div className="api-error">{apiResponse.message}</div>}
            {apiResponse.status == 'correct' && <div className="api-ok">{apiResponse.message}</div>}
            {apiResponse.status == 'network' && <div className="api-error">{apiResponse.message}</div>}
          </form>
          <Link to="/register">Don&#39;t have an account?</Link>
        </div>
        </div>
    </>
  );
};

export default Login;
