import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/TheQuestions.css";
import { meta } from "@eslint/js";
import PropTypes from "prop-types";



const TheQuestions = forwardRef(function TheQuestions({sendDataFromChild}, ref) {

  
  const [inputFields, setInputFields] = useState([{ question: '', answer: '' , multianswers:[], type:''}]);
  const [selectedOptions, setSelectedOptions] = useState([{typeofQuestion:'answer-text'}]);
// Each question could have four radioOptions
  const [radioOptions,setRadioOptions] = useState([{ question: [], answers: [] }])

  //When is Text-Type
  const handleFormChange = (index, event,type, radioindex=0) => {
    let data = [...inputFields];
    if(event.target.name!='multianswers'){
    data[index][event.target.name] = event.target.value;
    data[index].type=type
    setInputFields(data);
    }
    else{
      console.log(index)
      data[index][event.target.name][radioindex]= event.target.value;
      data[index].type=type
      setInputFields(data);
    }

  };

 //Drop-Down
  const handleSelectChange = (index,event) => {
    console.log(event.target.name, event.target.value)
    let data = [...selectedOptions];
    console.log(data)
    data[index][event.target.name] = event.target.value;
    setSelectedOptions(data);
  };


// Note removeQuestion and newQuestion are complementary...
  const newQuestion = () => {
    let newfield = { question: "", answer: "" , multianswers:[''], type:''};
    let newSelector={typeofQuestion:'answer-text'}
    let newRowRadioButton={ question: "", answers: [''] };
    //Maxium 4 Questions
    let metaInputFields = [...inputFields];
    if (metaInputFields.length < 4) 
        {
            setInputFields([...inputFields, newfield]);
            setSelectedOptions([...selectedOptions,newSelector]);
            setRadioOptions([...radioOptions,newRowRadioButton]);
        }
  };

  const removeQuestion = (index) => {
    let data = [...inputFields];
    let dataSelect=[...selectedOptions];
    let dataRemoveRadioButton=[...radioOptions]
    data.splice(index, 1);
    dataSelect.splice(index,1);
    dataRemoveRadioButton.splice(index,1);
    setInputFields(data);
    setSelectedOptions(dataSelect);
    setRadioOptions(dataRemoveRadioButton);
  };

  const newQuestionRadioButton = (index) => {
     let metaRadioOptions = [...radioOptions];
     let metaInputFields = [...inputFields];
     console.log(metaRadioOptions);     
    if (metaRadioOptions[index].answers.length < 4) 
        {
            metaRadioOptions[index].answers.push('')
            metaInputFields[index].multianswers.push('')
            setRadioOptions([...radioOptions]);
            setInputFields([...inputFields]);
        }
  };

  const deleteLastQuestionRadioButton = (index) => {
    let metaRadioOptions = [...radioOptions];
    let metaInputFields = [...inputFields];
    console.log(metaRadioOptions);     
   if (metaRadioOptions[index].answers.length > 0) 
       {
           metaRadioOptions[index].answers.pop()
           metaInputFields[index].multianswers.pop('')
           setRadioOptions([...radioOptions]);
           setInputFields([...inputFields]);
       }
 };


// const ValidateData = (obj) => {
//   for(let x of obj)
//   {
//     for(let key in x)
//     {
// console.log('key', key, x[key])
//     }    
//   }
// }
const sendData =(event) =>{
    let input=[...inputFields];
    console.log('andamos en el child \n',input)
    sendDataFromChild(input)
    console.log(event)
}





  useImperativeHandle(ref, () => {
    return {
      newQuestion,
      sendData
    };
  });

  return (
    <>
      {inputFields.map((input, index) => {
        return (
          <div className="TheQuestions" key={index}>
            <div className="TheQuestionsHeader">
              <span className="TheQuestionstitle">Question {index + 1}</span>
              <select
                name="typeofQuestion"
                id="typeofQuestion"
                value={selectedOptions[index]['typeofQuestion']}
                onChange={(event)=>handleSelectChange(index,event)}
              >
                <option value="answer-text">Text</option>
                <option value="answer-radio-button">RadioButton</option>
              </select>
              <button className="remove" onClick={() => removeQuestion(index)}>
                <span className="content-remove">x</span>
              </button>
            </div>

{/* Text */}
{selectedOptions[index]['typeofQuestion']=='answer-text' &&
<>
<input
              className="thequestion"
              name="question"
              maxLength={80}
              placeholder="Question"
              value={input.question}
              onChange={(event) => handleFormChange(index, event,'simple')}
              required
            />
            <input
              className="theTypeofQuestion"
              name="answer"
              maxLength={30}
              placeholder="Answers"
              value={input.answer}
              onChange={(event) => handleFormChange(index, event,'simple')}
              required
            />
            </>
      }
            

         {/* RadioButton */}
            {selectedOptions[index]['typeofQuestion']=='answer-radio-button' &&
            <>
            <div className="inputplusButtonRadioButton">
            <input
              className="thequestion"
              name="question"
              maxLength={80}
              placeholder="Question"
              value={input.question}
              onChange={(event) => handleFormChange(index, event, 'multi')}
              required
            />
            <button className="addOption" onClick={()=>newQuestionRadioButton(index)}>
                <span className="spanAddOption">Add Option</span>
                </button>
                <button className="addOption" onClick={()=>deleteLastQuestionRadioButton(index)}>
                <span className="spanAddOption">Delete Option</span>
                </button>
            </div>

            {radioOptions[index].answers.map((radio,radioindex)=>{return ( 
            
                <div key={radioindex} className='answers-from-radio-button'>
                <input
                    type="radio"
                    name="theQuestionsRadio"
                    value="coding"
                    className="theQuestionsCheckbox"
             
                  />
                    <input
                  className="theTypeofQuestion"
                  name="multianswers"
                  maxLength={30}
                  placeholder="Answers"
                  value={input.multianswers[radioindex]}
                  onChange={(event) => handleFormChange(index, event, 'multi', radioindex)}
                  required
                />

            </div>
            ) }) }

            </>
            
      }
             
          </div>
        );
      })}
    </>
  );
});

TheQuestions.propTypes = {
  sendDataFromChild: PropTypes.func.isRequired,
};

export default TheQuestions;
