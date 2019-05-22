import React, { Component, Fragment } from "react";
import Webcam from "./Webcam";
import Loader from "./Loader";

export class WebcamGroup extends Component {
  getWebcams = () => {
    return (
      <div className="conteiner pt-4 pb-4 webcam-group">
  

        <div className="row row-eq-height">
          <div className="col-md-1" />
          {this.props.webcams.map(webcam => {
            return (
              <Webcam
                key={webcam.id}
                imgUrl={webcam.image.daylight.preview}
                webcam={webcam}
                title={this.props.title}
              />
            );
          })}
        </div>
      </div>
    );
  };

  getLoaders = () => {
    return (
      <div className="conteiner pt-4 pb-4 webcam-group">
        <div className="row row-eq-height">
          <div className="col-md-1" />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      </div>
    );
  };

  render() {
    const loader = !this.props.hasData ? this.getLoaders() : null;

    const allWebcams = this.props.hasData ? this.getWebcams(): null;

    return (
      <Fragment>
        {loader}
        {allWebcams}
      </Fragment>
    );
  }
}

export default WebcamGroup;
