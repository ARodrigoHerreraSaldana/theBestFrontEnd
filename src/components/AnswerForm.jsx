import { forwardRef, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/QuestionForm.css";
import TheQuestions from "./TheQuestions.jsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import "./AnswerForm.css";
const a = [
    { question: 'question1', answer: 'answer1', multi: 'multianswer1', type:'type1' },
    { question: 'question2', answer: 'answer2', multi: 'multianswer2', type:'type2' },
    { question: 'question3', answer: 'answer3', multi: 'multianswer3' ,type:'type3'},
    { question: 'question4', answer: 'answer4', multi: 'multianswer4',type:'type4' }
  ];
const stringToArrayhelper = (obj) => {
    let metaobj = obj;
    for (const x in metaobj) {
        if (
            x == "multianswer1" ||
            x == "multianswer2" ||
            x == "multianswer3" ||
            x == "multianswer4"
        ) {
            if (metaobj[x] != null) {
                metaobj[x] = metaobj[x].split(",");
            }
        }
    }
    console.log("metaobj", metaobj);
    return metaobj;
};

async function sendAnswer(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER_WORK}/answers`, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              obj:data,
            }),
        });
        console.log('response-sendAnswer',response)
        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        }
        if(response.status==200)
        {
            const json = await response.json();
            return true
        }
  
    } catch (error) {
      console.error(error.message);
    }
}



async function getTemplate(data) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL_SERVER_WORK}/cards/uuid`,
            {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uuid: data,
                }),
            }
        );

        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        }
        if (response.status == 200) {
            const json = await response.json();
            let meta = [json.message];
            const newData = stringToArrayhelper(...meta);
            
            console.log("json ->", newData);
            console.log("sending response");
            return [newData];
        }
    } catch (error) {
        console.error(error.message);
    }
}

export const AnswerForm = () => {
    const count = useSelector((state) => state.stringS.value);
    const [data, setData] = React.useState([]);
    const [answer, setAnswer] = React.useState({
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [success, setSuccess] = useState(false);
    const [failure,setFailure] =useState(false);
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const handleChange = (event) => {
        setAnswer({ ...answer, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (event.target.checkValidity()) {
            //sendAnswer()
            console.log('answer',answer);
            console.log('count', count)
            let obj ={ "uuid":count, ... answer}
            const result=await sendAnswer(obj)
            console.log(result)
            if(result)
            {
                setSuccess(true)
                setFailure(false);
                await sleep(3000);
                navigate("/dashboard/templates");
            }
            else
            {
                setSuccess(false);
                setFailure(true);
            }
            
        } else {
            setSuccess(false);
            setFailure(false);
        }
    };

    
    React.useEffect(() => {
        const getData = async () => {
            try {
                const result = await getTemplate(count);
                console.log("result ->", result);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [count]);
    console.log("data", data);
    return (
        <>
          {data.length > 0 && (
            <form className="answer-form" onSubmit={handleSubmit}>
              <div className="AnswerContainerNavBar">
                <div className="Answer-header">
                  <div className="Answer-container">
                    <h1>{data[0].title}</h1>
                    <p>
                      Author: <span>{data[0].author}</span>
                    </p>
                    <p>
                      <span>{data[0].description}</span>
                    </p>
    {a.map((a_,index)=>(<>

    {/* Every array should follow this template */}
                    {data[0][a_[`question`]] && data[0][a_[`type`]] != null && (
                      <div className="Question">
                        <span>{data[0][a_[`question`]]}</span>
                        
                        {data[0][a_[`type`]]  == 'simple' ? (<>
                          <input
                            maxLength={30}
                            placeholder="answer"
                            name={a_[`answer`]}
                            value={answer[a_[`answer`]]}
                            onChange={handleChange}
                            required
                          />
                          </>
                        ) : (
                          <>
                            {data[0][a_[`multi`]] !== null &&
                              data[0][a_[`multi`]].length > 0 &&
                              data[0][a_[`multi`]].map((da, index) => (
                                <div key={index}>

                                  <div className="possible-answers">
                                    <input
                                      type="radio"
                                      maxLength={30}
                                      className="radio-answers"
                                      placeholder="answer"
                                      name={a_[`answer`]}
                                      value={data[0][a_[`multi`]][index]}
                                      onChange={handleChange}
                                      required
                                    />
                                    <label>{data[0][a_[`multi`]][index]}</label>
                                  </div>
                                </div>
                              ))} 
                          </>
                        )}
                      </div>
                    )}
 {/* Every array should follow this template */}

 </>))}
    
                    <button type="submit" value="Submit">
                      Submit
                    </button>
          
                  </div>
                </div>
              </div>
            </form>
          )}

{success && (
                      <div className="container-succes-message">
                        <span className="success-message-answer">
                          Answers were sent to the server
                        </span>
                      </div>
                    )}
                {failure && (
                      <div className="container-succes-message">
                        <span className="failure-message-answer">
                          Answers could not be sent to the server
                        </span>
                      </div>
                    )}
        </>
      );
    };
    
    export default AnswerForm;