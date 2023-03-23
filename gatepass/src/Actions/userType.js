import { RESIDENT_DATA, USER_TYPE } from "../ActionTypes/actionTypes"

export const userTypeAction = (payload)=> {
  
    return {

        type: USER_TYPE , 
        payload:payload
    }

}

export const getResidentDataAction = (residentData) => {

    return {

        type: RESIDENT_DATA,
        payload:residentData
    }
}

