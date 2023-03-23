import React from "react";
import visitorImg from "../../images/visitor.jpg"
import residentImg from "../../images/homeOwner.webp";
import { Tooltip, Fade } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { userTypeAction } from "../../Actions/userType";
import { useNavigate } from "react-router-dom";

function Home() {

    let userType = useSelector(( state)=>console.log(state.userType.userType));
 
    let dispatch = useDispatch();
    let navigate = useNavigate();

 
    const handleImageClick = (e)=> {
      
        let name = e.target.name;
        dispatch(userTypeAction(name));

        if(name == 'resident')
        { 
            
            navigate('/resident/login');
        }
        else if(name == 'visitor')
        {
           navigate('/visitor/apply');
        }
    }

  return (
    <div className="home">
      <h1 className="home__heading"> Are you a Visitor / Resident ? </h1>

      <div className="home__image">
        <Tooltip TransitionComponent={Fade} title="Visitor" arrow>
          <img
            name="visitor"
            style={{ width: "250px", objectFit: "cover", cursor: "pointer" }}
            src={visitorImg}
            onClick={(e) => handleImageClick(e)}
          />
        </Tooltip>

        <div className="home__line"></div>

        <Tooltip TransitionComponent={Fade} title="Resident" arrow>
          <img
            name="resident"
            style={{
              marginLeft: "50px",
              width: "250px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            src={residentImg}
            onClick={handleImageClick}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default Home;
