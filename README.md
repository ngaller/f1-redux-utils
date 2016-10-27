# f1-redux-utils

My utilities for Redux projects.

## Install

`npm i f1-redux-utils --save`

## Usage

The module uses ES6 syntax.

### Action Creators

A very simple action creation utility.

```
import { createAction, createActions } from 'f1-redux-utils/actionCreators'
const [act1, act2] = createActions('test1', 'test2')
const act3 = createAction('test3')
```

Now you can use act1() to create a new action.
The parameter will be placed in the "payload" field.
It takes an optional error parameter which will be placed in the
"error" field.

```
expect(act1()).to.eql({
  type: 'test1'
})
expect(act2('foo')).to.eql({
  type: 'test2',
  payload: 'foo'
})
expect(act3(null, 'error')).to.eql({
  type: 'test3',
  error: 'error'
})
```

### Load Action Container

Container wrapper that will trigger an action when it is rendered (in componentWillMount).
Use together with connect, for a container that needs to load some data when it is initially loaded.

```
import { connect } from 'react-redux';
import loadaction from 'f1-redux-utils/loadaction'

const mapStateToProps = state => ({
  id: state.location.id
})
const AdminContainer = loadaction({ id } => adminActions.loadTemplateById(id))(AdminPage);
// take care that the connect() call is after the loadaction call, so that the
// mapped state and actions are available as props within the callback
export default connect(mapStateToProps, adminActions)(AdminContainer);
```

### Handle Prefixed Actions

Helper function to write a reducer that will act on all actions that have a certain prefix.
A default state can be provided as well.

This example will handle the `PROJECT_LIST_ON_FILTER` action:

```
const list = handlePrefixedActions('PROJECT_LIST', {
  ON_FILTER: (state, action) => ({...state, filter: action.payload })
}, { filter: '' })
```

