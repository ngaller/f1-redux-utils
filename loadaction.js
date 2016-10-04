import React from 'react';

export default function loadaction(onLoadAction) {
  return function wrapper(WrappedComponent) {
    class LoadActionContainer extends React.Component {
      componentWillMount() {
        onLoadAction(this.props);
      }

      render() {
        return React.createElement(WrappedComponent, this.props);
      }
    }

    return LoadActionContainer
  }
}

