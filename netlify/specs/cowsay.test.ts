// test cowsay netlify function
import { handler } from 'netlify/functions/cowsay'
import { FORTUNE_TYPES } from '~types'
import * as utils from 'src/getRandomFortune'

describe('cowsay', () => {
  it('should return a cow saying something', async () => {
    expect(async () => {
      const response = await handler({} as any, {} as any)
      if (response) {
        const { body } = response
        const { message } = JSON.parse(body ?? "{ message: '' }")
        console.log(message)
      }
    }).not.toThrowError()

    const getFortune = jest.spyOn(utils, 'getRandomFortune')
    getFortune.mockResolvedValue({
      type: FORTUNE_TYPES.quote,
      lines: ['Hello World']
    })
    expect(handler({} as any, {} as any)).resolves.toMatchSnapshot()
  })
})
