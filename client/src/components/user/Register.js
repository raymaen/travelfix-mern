import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  updateInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password,
      password2
    };
    //console.log("handleSubmit is running");
    // Attempt to register
    this.props.register(newUser);
    this.setState({
      name: "",
      email: "",
      password: "",
      password2: ""
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

    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form className="form-signin p-5">
              <i
                className="far fa-paper-plane mb-4 text-primary"
                style={{ fontSize: "3em" }}
              />
              <h1 className="h3 mb-3 font-weight-normal">
                Create your account
              </h1>
              <hr />

              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your Name"
                  required
                  autoFocus=""
                  onChange={this.updateInput.bind(this)}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                  autoFocus=""
                  onChange={this.updateInput.bind(this)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  autoFocus=""
                  onChange={this.updateInput.bind(this)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password2"
                  className="form-control"
                  placeholder="Repeat Password"
                  required
                  autoFocus=""
                  onChange={this.updateInput.bind(this)}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Register
                </button>
                <h5 className="text-danger mt-4">{this.props.error}</h5>
                <p className="mt-5 mb-3 text-muted">© travelbox 2019</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error.msg.msg || "",
  isAuth: state.auth.isAuthenticated,
  userId: state.auth.user ? state.auth.user.id : null
});

export default connect(
  mapStateToProps,
  { register , clearErrors }
)(Register);
