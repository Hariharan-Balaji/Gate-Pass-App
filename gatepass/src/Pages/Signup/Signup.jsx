import React from 'react'
import './signup.css';
import  axios  from 'axios';
import { Dialog , DialogActions , DialogContentText , DialogTitle , DialogContent, TextField, Button } from '@material-ui/core'
import Close from '@material-ui/icons/Close'


function Signup( { openSignUp , setOpenSignUp}) {

    const [open, setOpen] = React.useState(true);

    const [signUpData , setSignUpData] = React.useState({

      name:"",
      email:"",
      password:"",
      roomNumber:"",
    });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSignUp(false);
  };

  const handleChange = (e) => {

     const name = e.target.name;
     
     setSignUpData( { ...signUpData, [name] : e.target.value } );
  }

  const handleClick = () => {

    
       axios.post("http://localhost:3000/residentData" , signUpData);
      handleClose();
      
          
  }

  return (
    <div className='signup'>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle  className='signup__title'>

      <h2 className='signup__heading'> Sign Up</h2>
     <Close className='signup__close' onClick={handleClose}/> 
     
     </DialogTitle>

     <div className='signup__separator' />
            <DialogContent style={{overflow:'hidden' , overflowX:'hidden'}}>
             
             <form className='signup__form'>
                         <input className='signup__input' type='text' placeholder='Full Name' name='name' onChange={(e) => handleChange(e)} required />

                          <input className='signup__input' type='email' placeholder='Email' name='email' onChange={(e) => handleChange(e)}  required />
                          
                          <input className='signup__input' type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} required/>

                          <input className='signup__input'  type='text' placeholder='Room Number' name='roomNumber'  onChange={(e) => handleChange(e)}  required /> 

                          <button  onClick={handleClick} className='signup__btn' type='button'> Sign Up </button>
             </form>


        </DialogContent>

    </Dialog>
    </div>
  )
}

export default Signup