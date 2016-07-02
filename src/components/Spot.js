import React from 'react'
import { render } from 'react-dom'

export const Spot = (name, address, i=0) => {
  return (
    <div className='spot' key={i}>
      <div>
        Name: {name}
      </div>
      <div>
        Address: {address}
      </div>
    </div>
  )
}
