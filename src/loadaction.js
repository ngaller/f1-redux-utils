import React from 'react';

// private
export function actionContainer(onLoadAction, onUnloadAction, autoConnect) {
  const wrapper = function wrapper(WrappedComponent) {
    class LoadActionContainer extends React.Component {
      componentWillMount() {
        this.invokeAction(onLoadAction)
      }

      componentWillUnmount() {
        this.invokeAction(onUnloadAction)
      }

      invokeAction(action) {
        if(action) {
          let callable = action
          if (autoConnect) {
            const store = this.props.store || this.context.store
            if (!store) {
              throw 'Unable to locate store in context or props'
            }
            callable = props => store.dispatch(action(props))
          }
          callable(this.props);
        }
      }

      render() {
        return React.createElement(WrappedComponent, this.props);
      }
    }
    LoadActionContainer.contextTypes = {
      store: React.PropTypes.object
    }

    return LoadActionContainer
  }
  return wrapper
}

/**
 * Decorator for a container.
 * When the container is mounted, the given onLoadAction function
 * will be invoked.
 * It will be passed the props as parameter.
 *
 * If autoConnect is passed, then onLoadAction is instead invoked
 * as an action creator and the created action is dispatched using the
 * Redux store in context.
 */
export default function loadaction(onLoadAction, autoConnect) {
  return actionContainer(onLoadAction, null, autoConnect)
}

