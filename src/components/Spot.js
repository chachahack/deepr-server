import React from 'react'
import { render } from 'react-dom'

export const Spot = (spot, i=0) => {
  let img = (
    <div className='spot_image' />
  )
  if (spot.image_url.shop_image1 != null) {
    img = (
      <img className='spot_item_image' src={spot.image_url.shop_image1} />
    )
  }
  return (
    <div className='spot_item' key={i}>
      {img}
      <div className='spot_item_name'>
        {spot.name}
      </div>
    </div>
  )
}
