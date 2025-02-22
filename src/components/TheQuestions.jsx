import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/TheQuestions.css";

const TheQuestions = forwardRef(function TheQuestions(props, ref) {
  const [inputFields, setInputFields] = useState([{ question: "", answer: "" }]);
  const [selectedOptions, setSelectedOptions] = useState([{typeofQuestion:'answer-text'}]);


  //When is Text-Type
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };


  const handleSelectChange = (index,event) => {
    console.log(event.target.name, event.target.value)
    let data = [...selectedOptions];
    console.log(data)
    data[index][event.target.name] = event.target.value;
    setSelectedOptions(data);
  };

  const newQuestion = () => {
    let newfield = { question: "", answer: "" };
    let newSelector={ typeofQuestion:'answer-text'}
    let metaInputFields = [...inputFields];
    if (metaInputFields.length < 4) 
        {
            setInputFields([...inputFields, newfield]);
            setSelectedOptions([...selectedOptions,newSelector]);
        }
  };

  const removeQuestion = (index) => {
    let data = [...inputFields];
    let dataSelect=[...selectedOptions];
    data.splice(index, 1);
    dataSelect.splice(index,1);
    setInputFields(data);
    setSelectedOptions(dataSelect)
  };

  useImperativeHandle(ref, () => {
    return {
      newQuestion,
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
              onChange={(event) => handleFormChange(index, event)}
            />
            <input
              className="theTypeofQuestion"
              name="answer"
              maxLength={30}
              placeholder="Answers"
              value={input.answer}
              onChange={(event) => handleFormChange(index, event)}
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
              onChange={(event) => handleFormChange(index, event)}
            />
            <button className="addOption">
                <span className="spanAddOption">Add Option</span>
                </button>
            </div>
            <div className='answers-from-radio-button'>
           <div>
            <input
                type="radio"
                name="radio-button"
                value="coding"
                className="theQuestionsCheckbox"
              />
                <input
              className="theTypeofQuestion"
              name="answer"
              maxLength={30}
              placeholder="Answers"
              value={input.answer}
              onChange={(event) => handleFormChange(index, event)}
            />
        </div>
  




            </div>
            </>
            
      }
             
          </div>
        );
      })}
    </>
  );
});
export default TheQuestions;
