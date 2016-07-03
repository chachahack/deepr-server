import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  icon : {
    'height': 70,
    'width': 70,
    'borderRadius': 70,
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
          <div className="profile_top">
            <div className="profile_image">
              <img style={styles.icon} src='https://pbs.twimg.com/profile_images/680695751542837248/lVoqPal2.jpg'/>
            </div>
            <div className='profile_name'>
              {this.props.name}
            </div>
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
