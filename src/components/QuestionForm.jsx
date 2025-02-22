import { forwardRef, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/QuestionForm.css";
import TheQuestions from "./TheQuestions.jsx";
import { useLocation } from 'react-router-dom'
const Question = () => {
  const [inputTitle, setInputTitle] = useState([
    { title: "", description: "" },
  ]);
  const [datafromChild, setDataFromChild]=useState({})
  const [success,setSuccess]=useState(false)
  const ref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const handleDataFromChild= (data) => {
    console.log(data)
    setDataFromChild(data);
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const handleSubmit = async (event) => {
    console.log('xxx')
    event.preventDefault();
 
   
   
    if (event.target.checkValidity()) {
        setSuccess(true)
        await sleep(1000)
        navigate('/dashboard/templates')
        let path=location.pathname.toString()

        let newString=path.substring(11)
        console.log(newString)
        
      } else {
        setSuccess(false)
      }
};

  return (
    <form onSubmit={handleSubmit}>
    <div className="SuperContainerNavBar">
      <div className="Question-header">
        <div className="Question-container">
          <input
            maxLength={30}
            className="untitledForm"
            placeholder="Untitled form"
            value={inputTitle.title}
            required
          ></input>
          <input
            maxLength={30}
            className="form-description"
            placeholder="Form description"
            value={inputTitle.description}
            required
          ></input>
        </div>
        <div className="AnotherQuestion">
          <button
            className="button-sign-header"
            onClick={() => ref.current?.newQuestion()}
          >
            <span className="sign-form">+</span>
          </button>
          Add question
        </div>
      </div>
      <div>
        <TheQuestions ref={ref} sendDataFromChild={handleDataFromChild}/>
      </div>
      <div className="containerButton2">
      <button type="submit" className="sendForm" onClick={(event) => ref.current?.sendData(event)}>Submit</button>
      {success &&  <span className="success-message">Form was sent to the server</span>}
      </div>
    </div>
    </form>
  );
};

export default Question;
