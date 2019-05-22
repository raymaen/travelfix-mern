import {USER_LOADED , SELECT_WEBCAM} from './types'
import axios from 'axios'

export const addWebcam = (authData = null, webcamId) => (dispatch) => {

    if (!authData) return;
  
    const header = tokenConfig(authData.token);
    
    axios
      .post("/api/webcams", { webcamId },  header )
      .then(res => {
        //  console.log(res)
          dispatch({
              type : USER_LOADED ,
              payload : res.data.user  
          })
      })
      .catch(() => console.log("Error adding webcam"));
  };  

  export const deleteWebcam = (authData = null, webcamId) => (dispatch) => {

        if (!authData) return;
      
        const header = tokenConfig(authData.token);

        
    
        axios
          .delete(`/api/webcams/${webcamId}`,  header)
          .then(res => {
             // console.log(res)
              dispatch({
                  type : USER_LOADED ,
                  payload : res.data.user  
              })
          })
          .catch((err) => console.log("Error adding webcam" , err));
      };  
    
    export const selectWebcam = webcam => ({
      type : SELECT_WEBCAM , 
      payload : webcam
    })
    


  const tokenConfig = token => {
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }
  
    return config;
  };