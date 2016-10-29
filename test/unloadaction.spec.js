import expect from 'expect.js'
import React from 'react'
import { mount } from 'enzyme'
import unloadaction from '../src/unloadaction'

describe('unloadaction', () => {
  it('should trigger unload action when unmounted', () => {
    let result = null
    const TestElement = props => <div />;
    const WrappedElement = unloadaction(() => {
      result = 'OK'
    })(TestElement)

    const wrapper = mount(<WrappedElement />)
    expect(result).to.be(null)
    expect(wrapper.find('div')).to.not.be.empty()
    wrapper.unmount()
    expect(result).to.be('OK')
  })

  it('should pass props down', () => {
    const TestElement = props =>
      <div>
        { props.testing }
      </div>;
    const WrappedElement = unloadaction(() => { })(TestElement)

    const wrapper = mount(<WrappedElement testing='testingprop' />)
    expect(wrapper.html()).to.be('<div>testingprop</div>')
  })
})
