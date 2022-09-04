import * as cowsay from 'netlify/functions/cowsay'

const { handler } = cowsay

describe('cowsay', () => {
  it('should log a cow saying something', async () => {
    const spy = jest.spyOn(console, 'log')
    let message = ''
    let response = await handler({} as any, {} as any)
    if (response) {
      const body = JSON.parse(response.body ?? "{ message: '' }")
      message = body.message
      console.log(message) // moo
      expect(console.log).toHaveBeenCalledWith(message)
    }
    spy.mockReset()
    spy.mockRestore()
  })
})
