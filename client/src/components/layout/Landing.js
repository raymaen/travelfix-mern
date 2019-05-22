import React from "react";
import { Link } from "react-router-dom";
import uuid from 'uuid/v4'

import getWebcams from "../../assets/api_utils/webcamController"

import {
  requestTypes,
  countries,
  categories
} from "../../assets/api_utils/apiParamTypes";

import WebcamGroup from "../webcams/WebcamGroup";

class Landing extends React.Component {
  state = {
    webcamGroups: [
      { title: "Australia" },
      { title: "Iceland" },
      { title: "Beaches from around the world" }, 
      {title : "Airports from around the world"}
    ],
    loadingErr: null,
    hasData: false
  };


  componentDidMount() {
    window.scrollTo(0, 0);

    const allRequests = [
      {
        type: requestTypes.byCountry,
        payload: countries.Australia,
        title: "Australia",
        isPrivate: false
      },
      {
        type: requestTypes.byCountry,
        payload: countries.Iceland,
        title: "Iceland",
        isPrivate: false
      },
      {
        type: requestTypes.byCategory,
        payload: categories.beach,
        title: "Beaches from around the world",
        isPrivate: false
      } ,
      {
        type: requestTypes.byCategory,
        payload: categories.airport,
        title: "Airports from around the world",
        isPrivate: true
      }

    ];

    getWebcams(allRequests)
      .then(data => {
        // console.log("Fetched webcams successfully");
        // console.log(data);
        this.setState({
          webcamGroups: [...[], ...data],
          hasData: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loadingErr: "Webcam error"
        });
      });
  }

  render() {
    const bg = require('../../assets/img/gopro.jpg')
    
    return (
      <div className="landing">
        <div
          className="container-fluid landing-hero text-white "
          style={{ borderTop: "1px solid #fff" }}
        >
          <div className="row">
            <div
              className="col-md-4 offset-md-1"
              style={{ padding: "100px 20px" }}
            >
              <h1>Live World Footage</h1>
              <hr style={{ background: "#fff" }} />
              <h4 className="mb-3">Access webcams photos from around the globe</h4>
              <p>
                We have gathered a collection of webcams from around the world for you to enjoy.
                Intreasted to see live photos from your favourite countries / locations ? 
                you have it all here! Easily add a unique collection to your account and discover new beautiful locations.
              </p>
              <Link to={"/register"} className="btn btn-primary btn-lg">
                Create Free Account
              </Link>
            </div>

            <div
              className="col-md-6 offset-md-1"
              style={{ backgroundImage: `url(${bg})` , backgroundSize : 'cover' }}
            />
          </div>
        </div>
        <div className="container text-center pt-5 mt-5 pb-5 icons-area">
          <div className="row pl-5 pr-5">
            <div className="col-md-4">
            <i className="fas fa-camera-retro"></i>
              <h5>Live Webcam Footage</h5>
              <hr />
              <p>
                TRAVELBOX relies on the wonderfull api from webcams.travel.api, to preset you live and reliable webcam data.
              </p>
            </div>
            <div className="col-md-4">
            <i className="fas fa-database"></i>
              <h5>Create Your Collection</h5>
              <hr />
              <p>
              After creating your free account, you can create your own collection of webcams - that will wait for you every time you login.
              </p>
            </div>
            <div className="col-md-4">
            <i className="fas fa-mountain"></i>
              <h5>Discover New Landscapes</h5>
              <hr />
              <p>
              With our latest, updates you can now discover a variety of landscapes , such as beaches, forests, mountains etc..
              </p>
            </div>
          </div>
        </div>

        {this.state.webcamGroups.map((groupData = null) => (
          <WebcamGroup
            hasData={this.state.hasData}
            webcams={groupData.webcams}
            title={groupData.title}
            showAll={false}
            key={uuid()}
          />
        ))}
      </div>
    );
  }
}

export default Landing;
