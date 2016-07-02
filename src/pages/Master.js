import React from 'react'
import ReactDOM from 'react-dom'

import {BlueGrey800} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
export const muiTheme = getMuiTheme({
  palette: {
    textColor: BlueGrey800,
  },
  appBar: {
    height: 50,
  },
})

const styles = {
  appbar: {
    marginTop: 0,
    //marginBottom: 64,
  },
  content: {
    width: '100%',
    height: '100%',
    top: 50,
  }
}

const Master = React.createClass({

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{width: '100%'}}>
          <div id='logo'>Deepr!</div>
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
})

export default Master
