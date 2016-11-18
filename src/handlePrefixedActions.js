export default function handlePrefixedActions(prefix, handlers, defaultState) {
  const rx = new RegExp('^' + prefix + '_');
  return (state, action) => {
    let key = action.type.replace(rx, '')
    if (('/' + key) in handlers) {
      key = '/' + key
    }
    if (key !== action.type && key in handlers) {
      return handlers[key](state || defaultState, action)
    }
    return state || defaultState
  }
}
