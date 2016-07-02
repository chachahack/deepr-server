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
      <header></header>
      <div style={styles.content}>
        <!-- restaurant list -->
        {this.props.children}
      </div>
    )
  }
})

export default Master
