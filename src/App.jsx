import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import FormRegistrationApp from './components/registerform.jsx';
import Login from './components/login.jsx';
//import { AuthProvider } from '../auth/authorizer.jsx';
//import Hello from './components/hello.jsx';
import RequireAuth from './components/requireauth.jsx';
//import BasicTable from './components/mytable.jsx';
// import EnhancedTable from './components/mytable2.jsx';
import EnhancedTable2 from './components/mytable3.jsx';
//import BasicModal from './components/Modal.jsx';

import Navbar from './components/navBar.jsx';
import TemplateGenerator from './components/templateGenerator.jsx';
import Question from './components/QuestionForm.jsx';
import AnswerForm from './components/AnswerForm.jsx';
import AllTheAnswers from './components/AllTheAnswers.jsx';
function App() {
    return (
      <Router>
       
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<FormRegistrationApp />} />
            <Route path="/dashboard" element={
              
            // {/* <RequireAuth> */}
            <Navbar/>
            // {/* </RequireAuth> */}
            
               }>
              <Route path="templates"  element={<TemplateGenerator/>}/>
              <Route path="panel"  element={<EnhancedTable2/>}/>  
              <Route path="answers" element={<AllTheAnswers/>}/>
            </Route>


            <Route path="/templates/:id" element={
              
              // {/* <RequireAuth> */}}
              // {/* </RequireAuth> */}
              <Navbar>
              <Question/>
              </Navbar>
              }/>

          <Route path="/answerTemplates/:id" element={
              
              // {/* <RequireAuth> */}}
              // {/* </RequireAuth> */}
              <Navbar>
              <AnswerForm/>
              </Navbar>
              }/>
{/* <Route path="/Counter" element = {<Counter/>}></Route> */}





          </Routes>



      </Router>
    );
  }


export default App
