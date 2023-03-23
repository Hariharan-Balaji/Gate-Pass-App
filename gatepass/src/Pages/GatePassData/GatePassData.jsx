import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import './gatepassdata.css';
import {Check, CheckCircle, Close } from '@material-ui/icons'
import emailjs from '@emailjs/browser';
function GatePassData() {

  const [residentVisitorData , setresidentVisitorData] = useState([]);
  const {id} = useParams();
  
  
  useEffect(() => {
    
      const getResidentVisitorData = async () => {

      const res = await axios.get('http://localhost:3333/visitorResidentMapping');
      console.log(res);
         const resArr =  res.data.filter( ( data , i) =>  ( data.residentId == id));  
         setresidentVisitorData(resArr);

    }
    getResidentVisitorData();
      
  } ,[])


  const handleApprove = (e , data) => {
 

        //  e.preventDefault();
        //  var templateParams = {
        //   to_mail:'hariharanbalaji96@gmail.com',
        //   to_name: 'xyz',
        //   from_name: 'abc',
        //   message: 'Please Find out the attached file',
        //   reply_to : 'hariharanbalaji96@gmail.com',
        // };

        // emailjs.send("service_bc66gjo" , "template_p3o791i" , templateParams ,'kuvLodOLTVwVE9kou').then( (result => {

        //   alert("Message Sent, We will get back to you shortly", result.text);
        // }),
        // (error) => {
        //   alert("An error occurred, Please try again", error.text);
        //   });

        alert("Gate pass has been approved");
  }


  const handleDeny =async(e , data) => {
   
    console.log(data);
    
    await axios.delete(`http://localhost:3333/visitorResidentMapping/${data.id}`);
 
    const res = await axios.get(`http://localhost:3333/visitorResidentMapping`);

    console.log(res.data);
    
    
    setresidentVisitorData(res.data);

  }




  

  

  return (
        <div>

          
          { 
             residentVisitorData.length == 0 ? <p className='no__data'>*** No New Requests *** </p>

             :

             <div className='main__card'>
                     {residentVisitorData.map( (data , i) => {

                        return (
                          <>
                          <div className='cover__photo'></div>
                          <div className='photo'>

                           { data.photo ? <img  className='img' src={data.photo} /> : <Avatar className='img' > { data.name.charAt(0)}</Avatar>}
                          </div>

                          <div className="content">
                            <h2 className='name'>{data.name}</h2>
                            <p> 📧 {data.email}</p>
                            <p> Purpose of Visit : { data.purposeOfVisit} </p>
                          </div>

                          <div className ='button'>
                            <Button variant='contained'  onClick={(e) => handleApprove(e ,data)} startIcon={<Check />} style={{margin:'10px'}} > Approve </Button>
                            <Button color='secondary' variant='outlined' startIcon = { <Close />} onClick={(e) => handleDeny(e,data)}> Deny </Button>
                          </div>
                          </>

                          
                        )
                     })}
            </div>
          }
        </div>
  )
}

export default GatePassData