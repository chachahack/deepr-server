import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  icon : {
    'height': 120,
    'width': 120,
    'borderRadius': 120,
    'display': 'block',
    'marginLeft': 'auto',
    'marginRight': 'auto',
  },
  name : {

  },
  message : {

  }
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.show) {
      return (
        <div className='profile'>
          <img style={styles.icon} src='https://pbs.twimg.com/profile_images/680695751542837248/lVoqPal2.jpg'/>
          <div className='profile_name'>
            {this.props.name}
          </div>
          <div className='profile_message'>
            {this.props.message}
          </div>
        </div>
      )
    }
    return null;
  }
}

Profile.defaultProps = {
  name: '',
  message: '',
  show: true
}
