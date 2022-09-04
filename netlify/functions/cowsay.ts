import { Handler } from '@netlify/functions'
import cowsay from 'cowsayjs'
import { Fortune } from '../../types'
import { getRandomFortune } from './getRandomFortune'

const handler: Handler = async (event, context) => {
  const { lines }: Fortune = await getRandomFortune()

  return {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    },
    statusCode: 200,
    body: JSON.stringify({
      message: cowsay.moo(lines.join('\n'))
    })
  }
}

export { handler }
