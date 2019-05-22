import axios from "axios";
import webcamServer from "./axiosConfig";
import { requestTypes } from "./apiParamTypes";

const createRequest = req => {
  if (req.type === requestTypes.byUniqueId)
    return webcamServer.get(
      `/webcam=${req.payload}?lang=en&show=webcams%3Aimage%2Clocation`
    );
  if (req.type === requestTypes.byCountry) {
    return webcamServer.get(
      `/country=${req.payload}?lang=en&show=webcams%3Aimage%2Clocation`
    );
  }

  if (req.type === requestTypes.byCategory)
    return webcamServer.get(
      `/category=${req.payload}?lang=en&show=webcams%3Aimage%2Clocation`
    );
  return null;
};

function apiRequestHandler(requests = []) {
  return new Promise((resolve, reject) => {
    /*
     Requests is an array of objects with a requestType and a payload
     For example : requests[1] --> {type : 'contry' , payload : 'AU' }

    #Note# this is NOT a redux function - since we are not saving 
     the data in a shared state (it is only displayed locally in the component).
 */

    const populatedRequests = requests.map(req => createRequest(req));

    // console.log(populatedRequests);

    axios
      .all(populatedRequests)
      .then(
        axios.spread((...responses) => {
          // console.log(responses);

          const data = responses.map((res, index) => ({
            webcams: res.data.result.webcams,
            title: requests[index].title,
            isPrivate: requests[index].isPrivate
          }));

          resolve(data);
        })
      )
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

const matrixify = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const apiGetById = (allIds = []) => {
  return new Promise((resolve, reject) => {
    // The api can send only 10 webcams with the same req.
    // Here we are breaking the request into seperate requests
    // And we will use axios.all for that.
    // Example request : axios.all( [ get(listOf10Ids) , get(listOf10Ids) ])

    // Parse all the ids into 2d array with 10-max items each
    const matrixifyedIds = matrixify(allIds, 10);

    const allRequests = Array(matrixifyedIds.length).fill("");

    // Create a 1d array with every child holding a list of max 10Ids
    // Example value : [ 'id1,id2,...id10' , 'id1,id2,...id10' ]
    matrixifyedIds.forEach((idGroup, index) => {
      idGroup.forEach(id => {
        allRequests[index] += `${id},`;
      });
    });

    // Create an actuall request object we can work with from every idList
    const populatedRequests = allRequests.map(idList =>
      webcamServer.get(
        `/webcam=${idList}?lang=en&show=webcams%3Aimage%2Clocation`
      )
    );

    axios
      .all(populatedRequests)
      .then(
        axios.spread((...responses) => {
          // console.log(responses);

          const data = responses.map((res, index) => res.data.result.webcams);

          resolve(data.flat());
        })
      )
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const addWebcam = (authData = null, webcamId) => {
  if (!authData) return;

  const token = tokenConfig(authData.token);

  axios
    .post("/api/webcams", { webcamId }, token)
    .then(res => console.log(res.data.user))
    .catch(() => console.log("Error adding webcam"));
};

export const deleteWebcam = (authData = null, webcamId) => {
  if (!authData) return;

  const token = tokenConfig(authData.token);

  axios
    .delete("/api/webcams", { webcamId }, token)
    .then(res => console.log("Success - removed webcam"))
    .catch(() => console.log("Error removing webcam"));
};

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

export default apiRequestHandler;
