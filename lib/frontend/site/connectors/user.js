import React, { Component } from 'react'
import user from 'lib/frontend/site/user/user'

export default function UserConnectorFactory (WrappedComponent) {
  return class UserConnector extends Component {
    static displayName = `UserConnector(${getDisplayName(WrappedComponent)})`

    static WrappedComponent = WrappedComponent

    static defaultProps = { user }

    componentDidMount () {
      user.fetch()
      user.onChange(this.handleUserStateChange)
      console.log("hola")
    }

    componentWillUnmount () {
      user.offChange(this.handleUserStateChange)
    }

    handleUserStateChange = () => {
      this.forceUpdate()
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'
}
