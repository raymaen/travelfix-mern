import React from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

import {
  addWebcam,
  deleteWebcam,
  selectWebcam
} from "../../actions/webcamActions";

class Webcam extends React.Component {
  addFavCam = () => {};

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

  handleSelect = () => {
    this.props.selectWebcam(this.props.webcam);
    const redirectURL = `/selected_webcam/${this.props.webcam.id}`
    this.props.history.push(redirectURL)
  }

  render() {
    const { webcam } = this.props;

    const title = webcam.location.city;

    const flagUrl = `https://www.countryflags.io/${
      webcam.location.country_code
    }/shiny/16.png`;



    const addClass = this.props.auth.isAuthenticated
      ? "fas fa-star add is-user"
      : "fas fa-star add no-user";

    const removeClass = this.props.auth.isAuthenticated ? "fas fa-trash-alt delete" : "d-none";

    const selectClass = "fas fa-eye select";

    return (
      <div className="col-md-2 mr-1 ml-1 webcam-conteiner">
        <div className="title">
          <h6 className="d-inline">{title.substring(0, 22)}</h6>
          <img
            src={flagUrl}
            alt={webcam.location.country}
            className="float-right pr-4"
          />
        </div>

        <hr />
        <div className="webcam-img-container bg-dark">
          <img src={this.props.imgUrl} width="100%" alt="" />
          <div className="overlay" width="100%">
            <h6>
              <span>Country : </span>
              {webcam.location.country.substring(0, 13)}
            </h6>
            <h6>
              <span>City : </span>
              {webcam.location.city.substring(0, 13)}
            </h6>
            <h6>
              <span>Timezone : </span>
              {webcam.location.timezone.substring(0, 13)}
            </h6>
          </div>

          {/* Add icon */}
          <i className={addClass} onClick={this.handleAdd.bind(this)} />

          {/* Remove icon */}
          <i className={removeClass} onClick={this.handleDelete.bind(this)} />

          {/* SELECT WEBCAM ACTION */}
          <i className={selectClass} onClick={this.handleSelect.bind(this)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(
  mapStateToProps,
  { addWebcam, deleteWebcam, selectWebcam }
)(Webcam));
