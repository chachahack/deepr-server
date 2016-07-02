import React from 'react'
import { render } from 'react-dom'

export const Spot = (rest, i=0) => {
  return (
    <div className='spot' key={i}>
      <img className="image" src="">
      <div className="rest_name">
        {rest.opentime}
      </div>
      <div className="price_range">
        予算: {rest.budget}
      </div>
    </div>
  )
}
