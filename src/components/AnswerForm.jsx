import { forwardRef, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/QuestionForm.css";
import TheQuestions from "./TheQuestions.jsx";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

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
        let meta=[json.message]
        console.log('json',meta)
      return meta;
    }

    
  } catch (error) {
    console.error(error.message);
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
};
export const AnswerForm = () => {
const [data,setData]=React.useState([]);
  const count = useSelector((state) => state.stringS.value);
  React.useEffect(() => {
    const getData = async () => {
      try {
         const result = await getTemplate(count);
        setData(result)
        } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [count]);
console.log('data' ,data)
  return (
    <form onSubmit={handleSubmit}>
     {
    data.length>0 && <>
<div className="AnswerContainerNavBar">
      <div className="Answer-header">
        <div className="Answer-container">
          <h1
          >
{data[0].title}
    </h1>
    <p>
        Author: <span>{data[0].author}</span>
    </p>
    <p>
    <span>{data[0].description}</span>
    </p>
    
    {data[0].question1!=null ? (
        <div className="Question">
    <span>{data[0].question1}</span>
    <input>
    </input>
    </div>):null}

    {data[0].question2!=null ? (
        <div className="Question">
    <span>{data[0].question2}</span>
    <input>
    </input>
    </div>):null}



    {data[0].question3!=null ? (
        <div className="Question">
    <span>{data[0].question3}</span>
    <input>
    </input>
    </div>):null}



    {data[0].question4!=null ? (
        <div className="Question">
    <span>{data[0].question3}</span>
    <input>
    </input>
    </div>):null}

    </div>
        </div>
      </div>
</>
          }
    </form>
    
  );
};
export default AnswerForm;
