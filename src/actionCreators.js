/**
 * Return an array of function of the form x => { type, payload = x }
 */
export function createActions(...types) {
  return types.map(createAction)
}

/**
 * Create a single action of the form x => { type, payload = x }
 *
 * @returns {Array}
 */
export function createAction(type) {
  return (payload, error) => (Object.assign({ type }, payload ? { payload } : {}, error ? { error } : {}))
}

/**
 * Create a single action of the form x => { type }
 * Use this for actions that do not carry any payload, this is useful especially if the action is
 * going to be used as an event handler to avoid accidentally including the DOM event as payload.
 */
export function createAction0(type) {
  return () => ({ type })
}

/**
 * Return an array of action creators.
 * Use this for actions that do not carry any payload.
 *
 * @returns {Array}
 */
export function createActions0(...types) {
  return types.map(createAction0)
}
