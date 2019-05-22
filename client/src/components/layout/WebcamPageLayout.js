import React, { Component } from "react";

import getWebcamsFromApi from "../../assets/api_utils/webcamController";
import WebcamGroup from "../webcams/WebcamGroup";

export class WebcamPageLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      webcamGroup: { title: props.match.params.value },
      loadingErr: null,
      hasData: false,
      value :  props.match.params.value  
    };
  }

  getWebcams = (match = this.props.match.params) => {
    const { type, value } = match
    const request = {
      type,
      payload: value,
      title: value,
      isPrivate: false
    };

    getWebcamsFromApi([request])
      .then(data => {
        this.setState({
          webcamGroup: { ...data[0] },
          hasData: true,
          loadingErr: null
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loadingErr: "Webcam error"
        });
      });
  }
  
  componentWillReceiveProps(nextProps){
    /*
    Render the new webcams every time a user
    clicks on a new url - 
    */
    if(nextProps.match.params.value !== this.state.value){
      this.getWebcams(nextProps.match.params)
      this.setState({
        value : nextProps.match.params.value ,
        hasData : false
      })
    }

  }

  componentDidMount() {
    this.getWebcams()
  }

  render() {
    const { value } = this.props.match.params;
    const name =
      this.props.match.params.type === "country"
        ? this.props.match.params.name
        : value;

    return (
      <div>
        <WebcamGroup
          hasData={this.state.hasData}
          webcams={this.state.webcamGroup.webcams}
          title={name}
          showAll={true}
        />
      </div>
    );
  }
}

export default WebcamPageLayout;
