import React from 'react'
import ReactDOM from 'react-dom'


const styles = {
  appbar: {
    marginTop: 0,
    //marginBottom: 64,
    position: 'fixed'
  },
  content: {
    width: '100%',
    height: '100%',
    top: 0,
    position: 'fixed',
  }
}

const Master = React.createClass({

  render() {
    return (
      <div style={{width: '100%'}}>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Master
