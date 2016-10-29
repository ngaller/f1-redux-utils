import expect from 'expect.js'
import React from 'react'
import { mount } from 'enzyme'
import loadaction from '../src/loadaction'

describe('loadaction', () => {
  it('should trigger load action when rendered', () => {
    let result
    const TestElement = props => <div />;
    const WrappedElement = loadaction(() => {
      result = 'OK'
    })(TestElement)

    const wrapper = mount(<WrappedElement />)
    expect(result).to.be('OK')
    expect(wrapper.find('div')).to.not.be.empty()
  })

  it('should dispatch created action to store', () => {
    let dispatchedAction
    const TestElement = props => <div />;
    const store = {
      dispatch: action => {
        dispatchedAction = action
      }
    }
    const actionCreator = ({ id }) => ({
      type: 'some action type',
      id
    })
    const WrappedElement = loadaction(actionCreator, true)(TestElement)

    const wrapper = mount(<WrappedElement id='123' />, {
      context: { store }
    })
    expect(dispatchedAction).to.eql({
      type: 'some action type',
      id: '123'
    })
  })

  it('should pass props down', () => {
    const TestElement = props =>
      <div>
        { props.testing }
      </div>;
    const WrappedElement = loadaction(() => { })(TestElement)

    const wrapper = mount(<WrappedElement testing='testingprop' />)
    expect(wrapper.html()).to.be('<div>testingprop</div>')
  })
})
