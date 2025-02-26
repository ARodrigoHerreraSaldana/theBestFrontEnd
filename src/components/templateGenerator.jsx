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
      

      if (!response) {
          throw new Error(`Response status: ${response.status}`);
      }

      if (response.status === 200) {
          const json = await response.json();
          
          return json;
      }
  } catch (error) {
      console.error(error.message);
  }
}




const Card = ({ author, title, description,index, uuidParent}) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const fillTemplate = () => {
    console.log(uuidParent)
    let id= uuid()
    navigate(state?.path || '/answerTemplates/'+id);
  }

  return (
      <div className="card" onClick={fillTemplate}>
          <img src={`https://picsum.photos/800/400?random=${index}`} />
          <h2 className="cardTitle">{title}</h2>
          <h3 className="cardAuthor">Author:{author}</h3>
          <p  className="cardDescription">{description}</p>
      </div>
  );
};

const CardList = ({ data }) => {
  return (
      <div className="card-list">
{data && data.map((item, index) => (
    <Card key={index} author={item.author} title={item.title} description={item.description} index={index} uuidParent={item.uuid}/>
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
      
      setData(result.message || [])
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  fetchData();
}, []); 



  return (
    <>
    <div className='containerGenerator'>
    <h1 className="titleGenerator">Popular templates</h1>
    <h1 className="titleGenerator-new" onClick={createNewTemplate}>Create new Template</h1>
    </div>
    <div>
    
<CardList data={data} />
    </div>
    </>
  );
}

export default TemplateGenerator;