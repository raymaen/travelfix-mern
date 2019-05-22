import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://webcamstravel.p.rapidapi.com/webcams/list",
  headers: {
    "X-RapidAPI-Host": "webcamstravel.p.rapidapi.com",
    "X-RapidAPI-Key": "3c215cb70fmsh9d3486cfcc4672ap1943f3jsn467402f54463"
  }
});

export default axiosConfig
