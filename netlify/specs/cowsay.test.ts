// test cowsay netlify function
import * as cowsay from 'netlify/functions/cowsay'

const { handler } = cowsay

describe('cowsay', () => {
  it('should return a cow saying something', async () => {
    let message = ''
    let response = await handler({} as any, {} as any)
    if (response) {
      const body = JSON.parse(response.body ?? "{ message: '' }")
      message = body.message
      console.log(message) // moo
    }
  })
})
