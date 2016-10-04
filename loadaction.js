import React from 'react';

/**
 * Decorator for a container.
 * When the container is mounted, the given onLoadAction function
 * will be invoked.
 * It will be passed the props as parameter.
 */
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

