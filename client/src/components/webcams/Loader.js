import React from 'react'
import loaderImgSrc from '../../assets/img/loader.jpg'

export default function Loader() {
  return (
    <div className="col-md-2">
    <img
      src={loaderImgSrc}
      width="100%"
      alt=""
    />
  </div>
  )
}
