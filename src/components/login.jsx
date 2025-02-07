import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./registform.css";
import useAuth from "../../auth/authorizer.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState({ status: null, message: null })
  const [blockLogin, setBlockLogin]= useState(false)
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setBlockLogin(true)
    console.log(import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/checkUser`, {
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
        setApiResponse({ status: 'correct', message: responseJSON?.response || 'ok' })
        login().then(() => {
          navigate(state?.path || "/dashboard");
        });
      }
      if (response.status == '400') {
        setApiResponse({ status: 'error', message: responseJSON?.response || 'Network error' })
    }
} catch (error) {
  setApiResponse({ status: 'error', message: (responseJSON?.response || 'Network error' )?? 'Network error' })        
    console.error('There was an error!', error);
}finally{
  setBlockLogin(false)
}
  };

  const validateForm = () => {
    return email && password;
  };
  return (
    <>
      <div>
        <div className="container">
            <form onSubmit={handleLogin}>
            <div className="form-container2">
              <h2>Log in</h2>
              <img src={"/static/images/farmLogo.png"}
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
        </div>
        <Link to="/register">Don&#39;t have an account?</Link>
      </div>
    </>
  );
};

export default Login;
