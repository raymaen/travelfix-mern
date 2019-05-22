import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import loaderSrc from '../../assets/img/loader.jpg'

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  updateInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    // Create user object
    const User = {
      email,
      password
    };
   // console.log("handleSubmit is running");
    // Attempt to register
    this.props.login(User);
    this.setState({
      email: "",
      password: ""
    });
  };

  componentDidMount() {
    this.props.clearErrors()
  }

  render() {
    if (this.props.isAuth) {
      const redirect = `/user/${this.props.userId}`;
      return <Redirect to={redirect} />;
    }

   const loader = this.props.isLoading ? <img src={loaderSrc} width="100px" alt=""/> : null

    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form className="form-signin p-5">
              <i
                class="far fa-paper-plane mb-4 text-primary"
                style={{ fontSize: "3em" }}
              />
              <h1 className="h3 mb-3 font-weight-normal">Login:</h1>
              <hr />

              <div className="form-group mt-4">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email address"
                  required="true"
                  autofocus=""
                  onChange={this.updateInput.bind(this)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  required="true"
                  autofocus=""
                  onChange={this.updateInput.bind(this)}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Sign in
                </button>
                <h5 className="text-danger">{this.props.error}</h5>
                <p className="mt-5 mb-3 text-muted">© travelbox 2019</p>
              </div>
              
            </form>
            {loader}
      
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error.msg.msg || "",
  isAuth: state.auth.isAuthenticated,
  userId: state.auth.user ? state.auth.user.id : null,
  isLoading  : state.auth.isLoading
});



export default connect(
  mapStateToProps,
  { login ,clearErrors }
)(Login);
