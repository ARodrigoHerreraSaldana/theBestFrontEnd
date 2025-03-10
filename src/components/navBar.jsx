import '../components/navBar.css'
import { Link } from 'react-router-dom'
import { useNavigate, Outlet } from 'react-router-dom';
import * as React from "react";
async function getData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_SERVER_AUTH}/logout`, {
            credentials: "include",
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
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





const Navbar = ({children}) => {


    const navigateTo = useNavigate();

    const handleClickPanel = async (e) => {
            navigateTo('/dashboard/panel')
      }

      const handleClickTemplates = async (e) => {
        
        navigateTo('/dashboard/templates')
    }
  
    const handleClickAnswers = async (e) => {
        
        navigateTo('/dashboard/answers')
    }
  
    const handleClickSalesForce = async (e) => {
        
        navigateTo('/dashboard/salesForce')
    }



      const handleClickLogOut = async (e) => {
        
        const result=await getData()
        
        if(!result)
        {
            e.preventDefault();
            e.stopPropagation();
            
            
        }
        else
        {
            
            navigateTo('/')
        }
      }

    return(<>
    <header>
        <nav>
            <div className="navbar">
                <ul className="menuHeader">
                    <li>
                    <button onClick={handleClickTemplates} >Templates</button>
                    </li>

                    <li>
                    <button onClick={handleClickAnswers} >Answers</button>
                    </li>

                    <li>
                    <button onClick={handleClickPanel} >Admin Panel</button>
                    </li>
                    <li>
                    <button onClick={handleClickSalesForce} >SalesForce</button>
                    </li>
                    <li>
                    <button onClick={handleClickLogOut} >LogOut</button>
                    </li>
                </ul>
            </div>
        </nav>

        </header>
        <main>
        
        {children}
        <Outlet />
        </main>
        </>
    )
}

export default Navbar