import React from "react";

export default function Footer() {
  return (
    <div className="container-fluid text-white mt-5 footer text-center">
      <div className="row pt-3 pb-2">
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <h5>TRAVELBOX</h5>
        </div>
        <div className="col-md-6 offset-md-1">
 
        </div>
        <div className="col-md-2">         
            <a className="btn btn-outline-light" href="https://github.com" target="_blank" rel="noopener noreferrer">
              View On Github  <i className="fab fa-github pl-2"></i>
            </a>
        </div>
      </div>
    </div>
  );
}
