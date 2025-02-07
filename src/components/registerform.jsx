import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import "./registform.css"

const FormRegistrationApp = () => {

    const [inputFields, setInputFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        occupation: ""
    });
    const [errors, setErrors] = useState({});
    const [apiResponse, setApiResponse] = useState({ status: null, message: null })

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.firstName.length < 1) {
            errors.firstName = "You are missing your First Name";
        }

        if (inputValues.lastName.length < 1) {
            errors.lastName = "You are missing your Last Name";
        }
        if (inputValues.password.length == 0) {
            errors.password = "You are missing the password";
        }
        if (inputValues.email.length == 0) {
            errors.email = "You are missing the email";
        }
        if (inputValues.occupation.length < 1) {
            errors.occupation = "You are missing your occupation";
        }
        return errors;
    };


    //   const finishSubmit = () => {
    //     console.log(inputFields);
    //   };
    //   useEffect(() => {
    //     if (Object.keys(errors).length === 0 && submitting) {
    //       finishSubmit();
    //     }
    //   }, [errors]);


    // const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setErrors(validateValues(inputFields));
        if(Object.keys(validateValues(inputFields)).length > 0){
        return
         }
        try {
            // Post the form data to the API
            const response = await fetch(`${import.meta.env.VITE_API_URL}/newUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: inputFields.firstName,
                    lastName: inputFields.lastName,
                    occupation: inputFields.occupation,
                    email: inputFields.email,
                    password: inputFields.password
                }),
            });
            const responseJSON = await response.json();

            if (response.status == '200') {
                setApiResponse({ status: 'correct', message: responseJSON?.success || 'ok' })
                await sleep(1000)
                navigate("/");
            }
            if (response.status == '400') {
                setApiResponse({ status: 'error', message: responseJSON?.error || 'mysterious error' })
                throw new Error({message: responseJSON?.error || 'mysterious error'});
            }
            // if (!response.ok) {
            //     setApiResponse({ status: 'network', message:'The network failedd'})
                
                
            // }


        } catch (error) {
            
            setApiResponse({ status: 'error', message: error.message})
            console.error('There was an error!', error);
        }

    };

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // const validateEmail = (email) => {
    //     return emailRegex.test(email);
    // };

    // const handleChange = (e) => {
    //     setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    //   };
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit2}>
                    <div className="form-container2">
                        <h2>Sign up </h2>
                        <img src={"/static/images/farmLogo.png"}
                alt="Description of Image"
              />
                    </div>
                    <div className="form-container">
                        <label>First Name</label>
                        <input maxLength={30} type="text" name="firstName" value={inputFields.firstName} onChange={handleChange}></input>
                        {errors.firstName ? (
                            <p className="error">
                                You are missing your First Name
                            </p>
                        ) : null}
                    </div>
                    <div className="form-container">
                        <label>Last Name</label>
                        <input maxLength={30} type="text" name="lastName" value={inputFields.lastName} onChange={handleChange}></input>
                        {errors.lastName ? (
                            <p className="error">
                                You are missing your Last Name
                            </p>
                        ) : null}
                    </div>
                    <div className="form-container">
                        <label>Email</label>
                        <input type="email" name="email" value={inputFields.email} onChange={handleChange}></input>
                        {errors.email ? (
                            <p className="error">
                                You are missing your email
                            </p>
                        ) : null}
                    </div>
                    <div className="form-container">
                        <label>Occupation</label>
                        <input maxLength={30} type="text" name="occupation" value={inputFields.occupation} onChange={handleChange}></input>
                        {errors.occupation ? (
                            <p className="error">
                                You are missing your occupation
                            </p>
                        ) : null}
                    </div>
                    <div className="form-container">
                        <label>Password</label>
                        <input maxLength={30} type="password" name="password" value={inputFields.password} onChange={handleChange}></input>
                        {errors.password ? (
                            <p className="error">
                                You are missing your password
                            </p>
                        ) : null}
                    </div>
                    {apiResponse.status == 'error' && <div className="api-error">{apiResponse.message}</div>}
                    {apiResponse.status == 'correct' && <div className="api-ok">{apiResponse.message}</div>}
                    {apiResponse.status == 'network' && <div className="api-error">{apiResponse.message}</div>}

                    <button type="submit">
                        Create your account
                    </button>
                </form>

            </div>
            <Link to="/">Log in</Link>
        </>
    );
};

export default FormRegistrationApp;
