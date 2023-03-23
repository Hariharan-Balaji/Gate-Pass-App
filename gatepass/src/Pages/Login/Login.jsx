import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import "./login.css";

function Login() { 

   let navigate = useNavigate();
    const [openSignUp, setOpenSignUp] = useState(false);
   
     
    const residentData = useSelector( ( state) => state.residentData.residentData);

 
    const [ loginData , setLoginData] =useState({

            email:"",
            password:""
    })

    const [isLoggedIn, setIsLoggedIn] = useState(0);

    const handleChange = (e) => {

        let name = e.target.name;

        setLoginData({ ...loginData , [name] : e.target.value});
    }

     const handleClick = () => {
 
       let length = 0;
          residentData.map((data , i) => {
 
               length+=1;
                  if(data.email === loginData.email && data.password === loginData.password)
                  {
                     
                     setIsLoggedIn(1);
                     navigate(`/resident/gatepass/${data.id}`);
                  }
                  else if(residentData.length === length)
                  {
                    setIsLoggedIn(2);
                  }
               
          })
     }


  return (
    <div className="login">


          { openSignUp ===true  && <Signup openSignUp={openSignUp} setOpenSignUp={setOpenSignUp}/>}

      <h1 className="login__heading"> Resident Login Form </h1>

      <div className="login__comp">
      { isLoggedIn == 2 && <p> Incorrect Email or Password </p>}
        <form className="login__form">

          <input name="email" className="login__input" type="email" placeholder="Email" required autoComplete="off" onChange={(e) =>handleChange(e)}/>

          <input  name = "password" className="login__input"  type="password" placeholder="Password" required  autoComplete="off" onChange={(e) =>handleChange(e)}/>

          <button onClick={handleClick} className="login__button" type="button"> Log in </button>

        </form>

        <div className="login__separator" />

        <p className="login__signup">
          New Resident ? <span className="login__span" onClick={ () => setOpenSignUp(true)} > Sign Up </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
