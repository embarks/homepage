import { Fortune, FORTUNE_TYPES } from '../../types'

export async function getRandomFortune(): Promise<Fortune> {
  const fortuneTypes = Object.values(FORTUNE_TYPES)
  const randomType = Math.floor(Math.random() * fortuneTypes.length)
  const fortuneType = fortuneTypes[randomType]
  try {
    const { fortunes } = await import(`./fortunes/${fortuneType}.json`)
    const randomFortuneIndex = Math.floor(Math.random() * fortunes.length)
    const fortune = fortunes.fortunes[randomFortuneIndex]
    return fortune
  } catch (error) {
    return {
      type: FORTUNE_TYPES.joke,
      lines: ['The world will end in 5 minutes.  Please log out.']
    }
  }
}
