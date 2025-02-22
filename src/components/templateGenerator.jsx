import React from 'react';
import '../components/templateGenerator.css'
import uuid from 'react-uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../../auth/authorizer.jsx";

function TemplateGenerator() {
const { login } = useAuth();
const navigate = useNavigate();
const { state } = useLocation();
  const createNewTemplate = () => {
  const id = uuid()
  login().then(() => {
    navigate(state?.path || '/templates/'+id);
  });
}
  return (
    <div className='containerGenerator'>
      <h1 className="titleGenerator">Create new Template</h1>
      <div className='containerButton'>
      <button className='button-sign' onClick={createNewTemplate}>
        <span className='sign'>+</span>
     
        </button>
        </div>
    </div>
  );
}

export default TemplateGenerator;