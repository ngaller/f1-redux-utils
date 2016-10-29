import React from 'react';
import {actionContainer} from './loadaction'

/**
 * Decorator for a container.
 * When the container is unmounted, the given onUnLoadAction function
 * will be invoked.
 * It will be passed tehe props as parameter.
 */
export default function unloadaction(onUnloadAction, autoConnect) {
  return actionContainer(null, onUnloadAction, autoConnect)
}

