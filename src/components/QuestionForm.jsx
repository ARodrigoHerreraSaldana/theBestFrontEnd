import { forwardRef, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/QuestionForm.css";
import TheQuestions from "./TheQuestions.jsx";

const Question = () => {
  const [inputTitle, setInputTitle] = useState([
    { title: "", description: "" },
  ]);
  const [datafromChild, setDataFromChild]=useState({})
  const ref = useRef();

  const handleDataFromChild= (data) => {
    console.log(data)
    setDataFromChild(data);
    
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
        console.log('valid')
        console.log('to the Backend',datafromChild)
      } else {
        console.error('Invalid')

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
      <button className="sendForm" onClick={() => ref.current?.sendData()}>Submit</button>
      </div>
    </div>
    </form>
  );
};

export default Question;
