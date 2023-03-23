import { configureStore } from "@reduxjs/toolkit";
import { residentDataReducer, userReducer } from "./Reducers/reducers";

export default configureStore({

    reducer:{

        userType: userReducer,
        residentData : residentDataReducer,
    }
})