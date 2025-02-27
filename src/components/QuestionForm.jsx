import { forwardRef, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/QuestionForm.css";
import TheQuestions from "./TheQuestions.jsx";
import { useLocation } from 'react-router-dom'


async function sendTemplate(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER_WORK}/templates`, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              obj:data,
            }),
        });
        
        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        }
        if(response.status==200)
        {
            return true
        }
  
      const json = await response.json();
      
    } catch (error) {
      console.error(error.message);
    }
}

const Question = () => {
  const [inputTitle, setInputTitle] = useState({ title: "", description: "" },
  );
  const [datafromChild, setDataFromChild]=useState({})
  const [questionsfromchild,setQuestionsfromchild]=useState(1)
  const [success,setSuccess]=useState(false)
  const ref = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDataFromChild= (data) => {
    setDataFromChild(data);
  }

  const handleQuestionsfromChild = (data) =>{
    setQuestionsfromchild(data)
    
  } 

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const handleChange=(event)=>{
    setInputTitle({...inputTitle,[event.target.name]: event.target.value,});
  }

  const transformArray = (testArray) =>{
    let Auxobj={}
    testArray.forEach((element,index) =>{
        Object.keys(element).forEach((key)=>{
            if(key!='multianswer')
            {
            Auxobj[`${key}${index+1}`]=element[key]
            }
            else {
            Auxobj[`${key}${index+1}`] = element[key].join(',')
            }
        })
    });
    return Auxobj
}


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.checkValidity()) {
        setSuccess(true)
       
        let path=location.pathname.toString()

        let newString=path.substring(11)
        let obj={uuid:newString, title:inputTitle.title, description:inputTitle.description, ...transformArray(datafromChild)}
        // 
        // 
        // 
        // 
        
        await sendTemplate(obj);
        await sleep(1000)
        navigate('/dashboard/templates')
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
            name="title"
            value={inputTitle.title}
            onChange={handleChange}
            required
          ></input>
          <input
            maxLength={30}
            className="form-description"
            placeholder="Form description"
            name="description"
            value={inputTitle.description}
            onChange={handleChange}
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
        <TheQuestions ref={ref} sendDataFromChild={handleDataFromChild} sendQuestionsFromChild={handleQuestionsfromChild}/>
      </div>
      <div className="containerButton2">
      <button type="submit" disabled={questionsfromchild < 1 ? true : false} className="sendForm" onClick={(event) => ref.current?.sendData(event)}>Submit</button>
      
      </div>
      {success &&  <div className="container-succes-message"><span className="success-message">Form was sent to the server</span></div>}
    </div>
    </form>
  );
};

export default Question;
