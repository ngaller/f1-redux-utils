/**
 * Return an array of function of the form x => { type, payload = x }
 */
export function createActions(...types) {
  return types.map(createAction)
}

/**
 * Create a single action of the form x => { type, payload = x }
 */
export function createAction(type) {
  return (payload, error) => (Object.assign({ type }, payload ? { payload } : {}, error ? { error } : {}))
}
