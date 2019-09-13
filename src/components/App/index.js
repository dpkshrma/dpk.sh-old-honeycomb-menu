import React from 'react'

class App extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
        {children}
      </>
    )
  }
}

export default App
