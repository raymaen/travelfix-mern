import React, { Component, Fragment } from "react";
import WebcamGroupTitle from "./WebcamGroupTitle";
import Webcam from "./Webcam";
import Loader from "./Loader";

export class WebcamGroup extends Component {
  getDaylightWebcams = () => {
    return (
      <div className="conteiner pt-4 pb-4 webcam-group">
        <WebcamGroupTitle title={this.props.title} />

        <div className="row row-eq-height">
          <div className="col-md-1" />
          {this.props.webcams.map((webcam, index) => {
            if (index < 5)
              return (
                <Webcam
                  key={webcam.id}
                  imgUrl={webcam.image.daylight.preview}
                  webcam={webcam}
                  title={this.props.title}
                />
              );
              return null
          })}
        </div>

        <div className="row row-eq-height">
          <div className="col-md-1" />
          {this.props.webcams.map((webcam, index) => {
            if (index >= 5)
              return (
                <Webcam
                  key={webcam.id}
                  imgUrl={webcam.image.daylight.preview}
                  webcam={webcam}
                  title={this.props.title}
                />
              );
              return null
          })}
        </div>
      </div>
    );
  };

  getLiveWebcams = () => {
    const extraTitle = `${this.props.title} - live`;
    return (
      <div className="conteiner pt-4 pb-4 webcam-group">
        <WebcamGroupTitle title={extraTitle} />

        <div className="row row-eq-height">
          <div className="col-md-1" />
          {this.props.webcams.map((webcam, index) => {
            if (index < 5)
              return (
                <Webcam
                  key={webcam.id}
                  imgUrl={webcam.image.current.preview}
                  webcam={webcam}
                  title={this.props.title}
                />
              );
              return null
          })}
        </div>

        <div className="row row-eq-height">
          <div className="col-md-1" />
          {this.props.webcams.map((webcam, index) => {
            if (index >= 5)
              return (
                <Webcam
                  key={webcam.id}
                  imgUrl={webcam.image.current.preview}
                  webcam={webcam}
                  title={this.props.title}
                />
              );
              return null
          })}
        </div>
      </div>
    );
  };
  getLoaders = () => {
    return (
      <div className="conteiner pt-4 pb-4 webcam-group">
        <WebcamGroupTitle title={this.props.title} />

        <div className="row row-eq-height">
          <div className="col-md-1" />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>

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

    const daylightWebcams = this.props.hasData
      ? this.getDaylightWebcams()
      : null;

    const liveWebcams =
      this.props.hasData && this.props.showAll ? this.getLiveWebcams() : null;

    return (
      <Fragment>
        {loader}
        {daylightWebcams}
        {liveWebcams}
      </Fragment>
    );
  }
}

export default WebcamGroup;
