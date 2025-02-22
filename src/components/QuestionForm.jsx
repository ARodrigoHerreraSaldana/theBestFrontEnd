import { forwardRef, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/QuestionForm.css";
import TheQuestions from "./TheQuestions.jsx";

const Question = () => {
  const [inputTitle, setInputTitle] = useState([
    { title: "", description: "" },
  ]);
  const ref = useRef();
  const Submit = (event) => {
    console.log(event);
  };

  return (
    <div className="SuperContainerNavBar">
      <div className="Question-header">
        <div className="Question-container">
          <input
            maxLength={30}
            className="untitledForm"
            placeholder="Untitled form"
            value={inputTitle.title}
          ></input>
          <input
            maxLength={30}
            className="form-description"
            placeholder="Form description"
            value={inputTitle.description}
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
        <TheQuestions ref={ref} />
      </div>
      <div className="containerButton2">
      <button className="sendForm" onClick={(event) => Submit(event)}>Submit</button>
      </div>
    </div>
  );
};

export default Question;
