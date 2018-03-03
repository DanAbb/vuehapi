import { expect } from 'chai'
import CheckUsernameAvailability from './CheckUsernameAvailability'

describe('CheckUsernameAvailability', () => {
  it('should return a string that says "Check username route hit"', () => {
    const string = CheckUsernameAvailability({})
    expect(string).to.be.a('string')
    expect(string).to.equal('Check username route hit')
  })
})