import React from 'react'

export default function WebcamGroupTitle(props) {
  return (
    <div className="row text-center">
    <div className="col-md-8 offset-md-2">
      <h3 className="pb-4 text-capitalize">{props.title} Webcams</h3>
    </div>
  </div>
  )
}
