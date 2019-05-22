import React, { Component, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { loadUser } from "../../actions/authActions";
import { apiGetById } from "../../assets/api_utils/webcamController";
import ProfileWebcamGroup from "../webcams/ProfileWebcamGroup";
import Loader from "../webcams/Loader";

export class Profile extends Component {
  state = {
    webcamData: [],
    loadingErr: null,
    hasData: false,
    deletedAll: false
  };

  matrixify = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  componentDidMount() {
    if (!this.props.user) return;

    if (this.props.user.webcams.length === 0)
      this.setState({
        hasData: true
      });

    if (this.props.user.webcams.length > 0) {
      // If user has 1 or more webcam , make a bulk api request by camIds

      // Test
      apiGetById(this.props.user.webcams)
        .then(webcamData => {
         // console.log(this.matrixify(webcamData, 5));
          this.setState({
            webcamData: [...webcamData],
            loadingErr: null,
            hasData: true
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (!this.props.isAuth || !this.props.user) {
      return <Redirect to="/" />;
    }

    const bg = require("../../assets/img/profilebg.jpg");

    const { hasData, deletedAll } = this.state;

    /*
      This object compares the initial api data with the live user data
      and sends it to the child components.
      This way we prevent additional rendering or api calls
    */
    let dynamicWebcamData = this.state.webcamData.filter(webcamObj =>
      this.props.user.webcams.includes(webcamObj.id)
    );

    const showMoreBtn = 
      <Link to="/webcams/country/AU/Australia" className="btn btn-primary mt-2 mb-2">
        Add new AU webcams !
      </Link>

    return (
      <Fragment>
        <div
          className="container-fluid text-center text-white"
          style={{
            background: `url(${bg})`,
            backgroundSize: "cover",
            minHeight: "300px",
            paddingTop: "130px"
          }}
        >
          <div className="row">
            <div className="col">
              <h2>Hello {this.props.user.name}! Welcome back.</h2>
            </div>
          </div>
        </div>

        <div
          className="container-fluid text-center pt-5"
          style={{ display: hasData ? "block" : "none" }}
        >
          <div className="row">
            <div className="col">
            {showMoreBtn}

              <h3 className="mt-3">
                {this.props.user.webcams.length > 0
                  ? "Your favourite webcams:"
                  : "No webcams"}
              </h3>
         
            </div>
          </div>
        </div>

        <div
          className="container-fluid text-center pt-5"
          style={{ display: hasData ? "none" : "block" }}
        >
          <div className="row">
            <div className="col-md-4" />
            <Loader />
            <Loader />
          </div>
        </div>

        <div
          className="profile-area"
          style={{ display: hasData ? "block" : "none" }}
        >
          <div
            className="test"
            style={{ display: deletedAll ? "none" : "block" }}
          >
            {this.matrixify(dynamicWebcamData, 5).map((webcamList = null) => (
              <ProfileWebcamGroup
                hasData={this.state.hasData}
                webcams={webcamList}
                title=""
                showAll={false}
                key={uuid()}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user ? state.auth.user : null,
  token: state.auth.token || null
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Profile);
