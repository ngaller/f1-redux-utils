export default function handlePrefixedActions(prefix, handlers, defaultState) {
  const rx = new RegExp('^' + prefix + '_')
  return (state, action) => {
    const key = action.type.replace(rx, '')
    if (key !== action.type && key in handlers) {
      return handlers[key](state || defaultState, action)
    }
    return state || defaultState
  }
}
