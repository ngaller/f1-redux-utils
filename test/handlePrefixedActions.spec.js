import expect from 'expect.js'
import handlePrefixedActions from '../src/handlePrefixedActions'

describe('handlePrefixedActions', () => {
  it('should return default state when no match and no incoming state', () => {
    const handler = handlePrefixedActions('XXX', {
    }, 'TEST')
    expect(handler(null, { type: 'TESTACTION' })).to.eql('TEST')
  })

  it('should return given state when no match', () => {
    const handler = handlePrefixedActions('XXX', {
    }, 'TEST')
    expect(handler('NEWSTATE', { type: 'TESTACTION' })).to.eql('NEWSTATE')
  })

  it('should not match action without prefix', () => {
    const handler = handlePrefixedActions('XXX', {
      ACTION: (state, action) => state + 'SOMETHING'
    }, 'TEST')
    expect(handler('NEWSTATE', { type: 'ACTION' })).to.eql('NEWSTATE')
  })

  it('should match action with prefix', () => {
    const handler = handlePrefixedActions('XXX', {
      ACTION: (state, action) => state + 'SOMETHING'
    }, 'TEST')
    expect(handler('NEWSTATE', { type: 'XXX_ACTION' })).to.eql('NEWSTATESOMETHING')
  })

  it('should match action with /', () => {
    const handler = handlePrefixedActions('XXX', {
      "/ACTION": (state, action) => state + 'SOMETHING'
    }, 'TEST')
    expect(handler('NEWSTATE', { type: 'ACTION' })).to.eql('NEWSTATESOMETHING')
  })
})
