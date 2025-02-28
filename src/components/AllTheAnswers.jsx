import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import React from "react";
import './AllTheAnswers.css'
async function allAnswers(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER_WORK}/answers`, {
            credentials: "include",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('response-sendAnswer',response)
        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        }
        if(response.status==200)
        {
            const json = await response.json();
            return json.message
        }
  
    } catch (error) {
      console.error(error.message);
    }
}

const AllTheAnswers =() => 
{
const [data,setData] = useState()
    React.useEffect(()=>
    {
const getAnswers = async () =>
{
try
{
const result=await allAnswers();
console.log("result ->", result);
setData(result)
console.log(result);
}
catch(error)
{
console.error(error)
}
};getAnswers();    
},[])
    return (
    <>
    {data && data.map((dat,index)=>(
<div key={index}>
    <div className="container-answers">
        <p>uuid:{dat.uuid}</p>
        <p>Answered by:{dat.user}</p>
        <p>Answer 1:{dat.answer1}</p>
        <p>Answer 2:{dat.answer2}</p>
        <p>Answer 3:{dat.answer3}</p>
        <p>Answer 4:{dat.answer4}</p>
        </div>
        </div>
    ))}
    </>
    )
}
export default AllTheAnswers;