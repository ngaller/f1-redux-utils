import React from 'react';

/**
 * Decorator for a container.
 * When the container is unmounted, the given onUnLoadAction function
 * will be invoked.
 * It will be passed the props as parameter.
 */
export default function unloadaction(onUnloadAction) {
  return function wrapper(WrappedComponent) {
    class UnloadActionContainer extends React.Component {
      componentWillUnmount() {
        onUnloadAction(this.props);
      }

      render() {
        return React.createElement(WrappedComponent, this.props);
      }
    }

    return UnloadActionContainer
  }
}

