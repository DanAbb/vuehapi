import { expect } from 'chai'
import ManualSignup from './ManualSignup'

describe('ManualSignup', () => {
  it('should return a string that says "Manual SIGNUP route hit"', () => {
    const string = ManualSignup({})
    expect(string).to.be.a('string')
    expect(string).to.equal('Manual SIGNUP route hit')
  })
})