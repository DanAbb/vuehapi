import { expect } from 'chai'
import ManualLogin from './ManualLogin'

describe('ManualLogin', () => {
  it('should return a string that says "Manual login route hit"', () => {
    const string = ManualLogin({})
    expect(string).to.be.a('string')
    expect(string).to.equal('Manual login route hit')
  })
})