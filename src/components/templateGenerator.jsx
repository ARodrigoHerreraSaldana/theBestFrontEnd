import React from 'react';
import '../components/templateGenerator.css'
import uuid from 'react-uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../../auth/authorizer.jsx";

async function getCards() {
  try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER_WORK}/cards`, {
          credentials: 'include',
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      console.log(response);

      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }

      if (response.status === 200) {
          const json = await response.json();
          console.log(json);
          return json;
      }
  } catch (error) {
      console.error(error.message);
  }
}




const Card = ({ author, title, description }) => {
  return (
      <div className="card">
          <h2>{title}</h2>
          <h3>{author}</h3>
          <p>{description}</p>
      </div>
  );
};

const CardList = ({ data }) => {
  return (
      <div className="card-list">
{data.message && data.message.map((item, index) => (
    <Card key={index} author={item.author} title={item.title} description={item.description} />
))}
      </div>
  );
};

    



function TemplateGenerator() {
const { login } = useAuth();
const navigate = useNavigate();
const { state } = useLocation();
const [data,setData]=React.useState([]);
  const createNewTemplate = () => {
  const id = uuid()
  login().then(() => {
    navigate(state?.path || '/templates/'+id);
  });
}

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await getCards();
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  fetchData();
}, []); 



  return (
    <>
    <div className='containerGenerator'>
      <h1 className="titleGenerator">Create new Template</h1>
      <div className='containerButton'>
      <button className='button-sign' onClick={createNewTemplate}>
        <span className='sign'>+</span>
        </button>
        </div>
    </div>
    <div>
<CardList data={data} />
    </div>
    </>
  );
}

export default TemplateGenerator;