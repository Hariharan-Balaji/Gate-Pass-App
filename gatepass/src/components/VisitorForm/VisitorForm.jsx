import { TextField } from '@material-ui/core';
import './visitorForm.css'
import React, { useState } from 'react'
import './visitorForm.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VisitorForm() {

 let navigate = useNavigate();
  const residentData = useSelector(( state) => state.residentData.residentData);

  
  let date = new Date();


  const [ visitorData , setVisitorData] = useState( {

    name:"",
    email:"",
    roomNumber:"",
    purposeOfVisit:"",
    photo:"",
  })

  const [ visitorDataerror , setVisitorDataerror ] = useState( {

    name:"",
    email:"",
    roomNumber:"",
    purposeOfVisit:"",
    photo:"",
  });
  
  const handleChange = (e) => {

    const name = e.target.name;
   
    if(name==='photo')
    {
  
      setVisitorData({ ...visitorData , photo:URL.createObjectURL(e.target.files[0])});

    }
    else
    setVisitorData({ ...visitorData , [name]:e.target.value});
    
  }
  const checkEmpty = ( data) => {
 

      if(!data.trim())
      {
        
      }
      return false;
  }

  const handleClick = (event) => {
event.preventDefault();
     checkEmpty(   visitorData.name) ?  setVisitorDataerror({...visitorDataerror , 'name':'Name cannot be empty'}) : setVisitorDataerror({...visitorDataerror , 'name':""});
    //  checkEmpty( visitorData.email) ?  setVisitorDataerror({...visitorDataerror , 'email':'Email cannot be empty'}) : setVisitorDataerror({...visitorDataerror , 'email':""});



    
    
        
         const res =   residentData.filter( ( data , i ) => {
 
                 return data.roomNumber === visitorData.roomNumber
                     
      })

      
      if(res.length === 0) {
  
        setVisitorDataerror({ ...visitorDataerror , 'roomNumber':'Room number does not exist'})
        return false;

      }
      
      

       const finalData = {...visitorData , "residentId":res[0].id , "timestamp" :date};

       setVisitorData({
        name:"",
       email:"",
      roomNumber:"",
      purposeOfVisit:"",
      photo:"",
      })


      
    
      axios.post(`http://localhost:3333/visitorResidentMapping` ,finalData).then( () => {

          setTimeout( () => {
            alert("Gate pass has been applied!!");
          },1000);
      })

      
    
  }

  return (
    <div className='visitor__form'>
          
          <div className='visitor__form__div'>
              <h1 className='visitor__heading'> Apply for a Gate Pass </h1>
          <form className='visitor__form__form'> 
                     <input placeholder='Name' name='name' className='visitor__input' type='text' size="30" onChange={(e) => handleChange(e)}
                    /> 
                    

                     <input placeholder='Email' name='email' className='visitor__input' type='email' size="30" onChange={(e) => handleChange(e)} required/>

                    <input placeholder='Room #' type='text' name='roomNumber' className='visitor__input' size="30" onChange={(e) => handleChange(e)} required/>
                    <span className='error__msg' style={{fontSize:'14px' , color:'red', marginLeft:'140px'}}> { visitorDataerror.roomNumber}</span>

                    <textarea placeholder='Purpose of Visit' name='purposeOfVisit' className='visitor__input2' rows="5" cols="30"  onChange={(e) => handleChange(e)} required />
  
                      <div className='visitor__image'>

                      <label class="custom-file-upload" > 
                        <input type="file"  onChange={(e) => handleChange(e)} name='photo' />
                          Upload your photo
                          </label>
                    
                    { visitorData.photo !== "" && <img className='visitor__img__display' src={visitorData.photo}/>}
                      </div>
                    
                    <button type='button' className='visitor__btn' onClick={(e) => handleClick(e)}> Apply </button>


         </form>      
          </div>
         
      
    </div>
  )
}

export default VisitorForm