import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import '../components/QuestionForm.css'

const TheQuestions = () => {

    const handleFormChange = (index,event) => {
let data = [...inputFields]
data[index][event.target.name]= event.target.value
setInputFields(data)
    }
    const newQuestion = () => 
    {
        let newfield = { name: '', age: '' }
        let metaInputFields=[...inputFields]
        if( metaInputFields.length<5)setInputFields([...inputFields, newfield])
    }


 const [inputFields, setInputFields]= useState([{name:'',age:''}]);
 return (
    <>
        {inputFields.map((input, index) => { 
            return (
                <div key={index}>
                    <input name='name' maxLength={30} placeholder='name' value={input.name} onChange={(event)=>handleFormChange(index,event)}/>
                    <input name='age' maxLength={30} placeholder='age' value={input.age} onChange={(event)=>handleFormChange(index,event)}/>
                    <button onClick={newQuestion}></button>
                </div>
            )
        })}
    </>
)
}
const Question = () => {
    const [inputTitle, setInputTitle]= useState([{title:'',description:''}]);
    return (
        <div className="SuperContainerNavBar">
        <div className="Question-container">
        <input maxLength={30} className="untitledForm" placeholder="Untitled form" value={inputTitle.title}></input>
        <input maxLength={30} className="form-description" placeholder="Form description" value={inputTitle.description}></input>
        </div>
        <div>
           <TheQuestions/>
        </div>
        </div>
    );
  }

  export default Question;