import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';

import {Spot} from '../components/Spot';
import {Map, Marker, InfoWindow} from 'google-maps-react'

const styles = {
  map: {
    width: "100%",
    height: 300
  }
};

export default class Eat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    jquery.ajax({
      type: 'get',
      url: './eat' + this.props.location.search
    }).done((data) => {
      this.setState({data: data});
    });
  }

  onMarkerClick(name) {
    console.log(name);
  }

  render() {
    if (this.state.data == null) {
      return null;
    }

    const rest = this.state.data.rest;
    if (rest == null) {
      return null;
    }

    const restran_list = rest.map((item, i) => {
      return (
        Spot(item, i)
      )
    });

    const marker_list = rest.map((item, i) => {
      return (
        <Marker onClick={this.onMarkerClick}
                name={item.name}
                position={{lat: item.latitude, lng:item.longitude}}
                key={i} />
      )
    })

    return(
      <div className='eat'>
        <div className='profile'>
        </div>
        <div className='map'>
          <Map style={styles.map}
               google={window.google}
               zoom={17}
               initialCenter={{lat: this.props.location.query.lat, lng:this.props.location.query.lng}}>
            {marker_list}
          </Map>
        </div>
        {restran_list}
      </div>
    );
  }
}
