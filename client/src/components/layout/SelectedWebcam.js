import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addWebcam, deleteWebcam } from "../../actions/webcamActions";
import { Redirect, Link } from "react-router-dom";

export class SelectedWebcam extends Component {
  state = {
    images: []
  };


  handleAdd = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.addWebcam(this.props.auth, this.props.webcam.id);
    }
  };

  handleDelete = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.deleteWebcam(this.props.auth, this.props.webcam.id);
    }
  };

  getCta = () => {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.webcams.includes(this.props.webcam.id))
        return (
          <button className="btn btn-outline-danger btn-lg" onClick={this.handleDelete.bind(this)}>
            Remove From Favourites
          </button>
        );
      return (
        <button className="btn btn-warning btn-lg" onClick={this.handleAdd.bind(this)}>Add To Favourites</button>
      );
    }
    return (
      <Link to="/login" className="btn btn-dark btn-lg">
        Login To Save This Webcam
      </Link>
    );
  };

  getGallery = () => {
    if (this.state.images.length === 0) return null;

    return this.state.images.map(img => (
      <div className="col-md-4">
        <img src={img} alt="" />
      </div>
    ));
  };

  
  componentDidMount() {
    window.scrollTo(0, 0);

    if (!this.props.webcam) return;

    const accessKey =
      "a6bc549b50e5d43c46a9816b765894aed9bfeff3d2876c36b2f60b75390a9adb";
    const country = this.props.webcam.location.country.toLowerCase();
    const url = `https://api.unsplash.com/search/photos?query=${country}&per_page=25&client_id=${accessKey}`;

    axios
      .get(url)
      .then(res => {
        const images = res.data.results
          .filter(imageData => imageData.width > imageData.height)
          .map(imgData => imgData.urls.small)
          .filter((img, index) => index < 12);
        this.setState({
          images
        });
      })
      .catch(err => console.log("err"));
  }


  render() {
    if (this.props.webcam === null) return <Redirect to="/" />;

    let { status, title } = this.props.webcam;
    let {
      city,
      region,
      country,
      latitude,
      longitude

    } = this.props.webcam.location;
    let daylightImg = this.props.webcam.image.daylight.preview;
    let liveImg = this.props.webcam.image.current.preview;

    // Google map api : google.com/maps/search/?api=1&query=<lat>,<lng>
    const googleMapLocation = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    const cta = this.getCta();

    const gallery = this.getGallery();

    return (
      <div className="container-fluid selected-webcam">
        <div className="row">
          <div className="col-md-6 info">
            <div>
              <h5>Webcam details:</h5>

              <h6>
                <i class="fas fa-caret-right" /> Country : {country}
              </h6>
              <h6>
                <i class="fas fa-caret-right" /> Region : {region}
              </h6>
              <h6>
                <i class="fas fa-caret-right" /> City : {city}
              </h6>

              <hr />

              <h6>
                <i class="fas fa-caret-right" /> Status : {status}
              </h6>
              <h6>
                <i class="fas fa-caret-right" /> Latitude : {latitude}
              </h6>
              <h6>
                <i class="fas fa-caret-right" /> Longitude : {longitude}
              </h6>

              <a
                href={googleMapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-success mt-5"
              >
                View In Google Maps <i class="fas fa-map-marker-alt" />
              </a>
            </div>
          </div>

          <div className="col-md-6 text-center webcam">
            <h5>{title}</h5>

            <div className="mt-4">
              <img src={daylightImg} width="50%" alt="" />
              <h6>Daylight footage</h6>
            </div>

            <div className="mt-4">
              <img src={liveImg} width="50%" alt="" />
              <h6>Current footage</h6>
            </div>
            <hr />
            {cta}
          </div>
        </div>

        <div className="row text-center mt-5 mb-5 pt-4 pb-4">
          <div className="col">
            <h4>More Footage from this region:</h4>
          </div>
        </div>

        <div className="row gallery">{gallery}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  webcam: state.webcam
});

export default connect(
  mapStateToProps,
  { addWebcam, deleteWebcam }
)(SelectedWebcam);
