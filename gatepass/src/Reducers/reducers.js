import { RESIDENT_DATA, USER_TYPE } from "../ActionTypes/actionTypes"

const initialState = {

    userType: "",
    residentData :[] 
}

export const userReducer = ( state=initialState  , action) => {


    switch(action.type)
    {
        case USER_TYPE: 
                     return { ...state , userType:action.payload}
        default:
            return state;
    }
}

export const residentDataReducer = ( state = initialState , action)=> {
 
     switch(action.type) {

        case RESIDENT_DATA:
            return { ...state , residentData:action.payload}

        default:
            return state;
     }

}