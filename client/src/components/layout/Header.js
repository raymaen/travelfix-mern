import React from "react";
import { Link , withRouter } from "react-router-dom";
import { connect } from "react-redux";
import uuid from "uuid/v4";

import { logout } from '../../actions/authActions'

import loaderSrc from "../../assets/img/loader.jpg";

import { countries, categories } from "../../assets/api_utils/apiParamTypes";

class Header extends React.Component {
  // We need to get the exact value from key


  handleLogout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  generalUserHeader = () => {
    if (!this.props.isAuth && !this.props.isLoading)
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link btn btn-primary text-capitalize"
              to="/register"
            >
              Create Free Account
            </Link>
          </li>
        </ul>
      );
    return null;
  };

  authenticatedUserHeader = () => {
   

    if (this.props.isAuth && !this.props.isLoading)
    {  
      const profileUrl = `/user/${this.props.user.id}`;
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" style={{border : 'none' , background: 'none'}} onClick={this.handleLogout}>
              Logout
            </button>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link btn btn-primary text-capitalize"
              to={profileUrl}
            >
              Your Profile
            </Link>
          </li>
        </ul>
      );}
    return null;
  };

  loadingUserHeader = () => {
    if (!this.props.isAuth && this.props.isLoading)
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <h6 className="text-secondary pt-1 pr-3">Loading your data...</h6>
          </li>
          <li className="nav-item">
            <img src={loaderSrc} width="30px" height="30px" alt="" />
          </li>
        </ul>
      );
    return null;
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
          travelbox
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* Countries */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Countrie Cams
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          
                {Object.entries(countries).map(data => {
                  const url = data[1]
                    ? `/webcams/country/${data[1]}/${data[0]}`
                    : "/";

                  return (
                    <Link
                      className="dropdown-item text-capitalize"
                      key={uuid()}
                      to={url}
                    >
                      {data[0]}{" "}
                      <i
                        className="fas fa-video float-right pt-1 text-secondary"
                        style={{ fontSize: ".7em" }}
                      />
                    </Link>
                  );
                })}
              </div>
            </li>

            {/* Categories */}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cams By Category
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             
                {Object.keys(categories).map(name => {
                  const url = name
                    ? `/webcams/category/${name}/isCategory`
                    : "/";

                  return (
                    <Link
                      className="dropdown-item text-capitalize"
                      key={uuid()}
                      to={url}
                    >
                      {name}
                      <i
                        className="fas fa-video float-right pt-1 text-secondary"
                        style={{ fontSize: ".7em" }}
                      />
                    </Link>
                  );
                })}
              </div>
            </li>

 
          </ul>

          {this.generalUserHeader()}
          {this.authenticatedUserHeader()}
          {this.loadingUserHeader()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

export default withRouter(connect(mapStateToProps , {logout})(Header));
