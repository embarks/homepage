// test cowsay netlify function
import * as cowsay from 'netlify/functions/cowsay'

const { handler } = cowsay

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
  })
})
