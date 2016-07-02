import React from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
} from 'react-router';

import jquery from 'jquery';

import {Spot} from '../components/Spot';

const styles = {
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
        Spot(item.name, item.address, i)
      )
    });
    return(
      <div className='eat'>
        {restran_list}
      </div>
    );
  }
}
