import { readFile } from 'fs/promises'
import { Handler } from '@netlify/functions'
import cowsay from 'cowsayjs'
import { Fortune, FortuneResponse, FORTUNE_TYPES } from '~types'

async function readJsonFile(path: string): Promise<FortuneResponse> {
  const file = await readFile(path, 'utf8')
  return JSON.parse(file)
}

async function getRandomFortune(): Promise<Fortune> {
  const fortuneTypes = Object.values(FORTUNE_TYPES)
  const randomType = Math.floor(Math.random() * fortuneTypes.length)
  const fortuneType = fortuneTypes[randomType]
  try {
    const { fortunes }: FortuneResponse = await readJsonFile(
      `fortunes/${fortuneType}.json`
    )
    const randomFortuneIndex = Math.floor(Math.random() * fortunes.length)
    const fortune = fortunes[randomFortuneIndex]
    return fortune
  } catch (error) {
    console.error(error)
    return {
      type: FORTUNE_TYPES.joke,
      lines: ['The world will end in 5 minutes.  Please log out.']
    }
  }
}

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
