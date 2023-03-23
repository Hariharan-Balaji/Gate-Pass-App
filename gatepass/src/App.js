import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getResidentDataAction } from './Actions/userType';
import './App.css';
import VisitorForm from './components/VisitorForm/VisitorForm';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import GatePassData from './Pages/GatePassData/GatePassData';

function App() {
 
 
  let dispatch = useDispatch();

  const residentData = useSelector( ( state) => console.log(state.residentData.residentData));
   
     useEffect( () => {
 
              const getData =  async() => {
                const res =  await axios.get('http://localhost:3000/residentData');
                dispatch(getResidentDataAction(res.data));   
              }

              getData();

              
           
     } , [ residentData]);

  return (
    <div className="App">
          
        <BrowserRouter>
          <Routes>
                     <Route path='/' element={< Home/>} />
                     <Route path='/resident/login' element= { <Login/>} /> 
                     <Route  path='visitor/apply' element={<VisitorForm/>}/>
                     <Route  path = '/resident/gatepass/:id' element={ <GatePassData/>}/>
          </Routes>
        </BrowserRouter>
             
             
    </div>
  );
}

export default App;
