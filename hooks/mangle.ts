import { useEffect, useRef, useState } from 'react'

const mangle = (str: string) => {
  // for every letter in a word, replace it with a random letter from somewhere else in the word
  const word = str.split('')
  // for each letter
  return word
    .map((letter) => {
      // make an array of all the letters that are not the current letter
      const otherLetters = word.filter((otherLetter) => letter !== otherLetter)
      // pick a random letter from the other letters
      const randomLetter =
        otherLetters[Math.floor(Math.random() * otherLetters.length)]
      // return the random letter
      return randomLetter
    })
    .join('')
}

const useMangle = (str: string) => {
  const [mangledWord, _setMangledWord] = useState(str)
  const isMangling = useRef(false)

  const triggerMangle = () => {
    if (isMangling.current) return
    isMangling.current = true

    _setMangledWord(mangle(str))

    // put the word's indexes in a random order
    const shuffledIndexes = Array.from(
      { length: str.length },
      (_, i) => i
    ).sort(() => Math.random() - 0.5)

    const interval = setInterval(() => {
      _setMangledWord((prev) => {
        // check all the letters at the indexes in the shuffled order
        // if any of them are wrong, fix them
        // if all of them are right, stop the interval
        const mangledWordArray = prev.split('')
        const strArray = str.split('')
        const currentInterval = shuffledIndexes.shift()
        if (currentInterval === undefined) {
          clearInterval(interval)
          isMangling.current = false
          return str
        }
        const currentLetter = mangledWordArray[currentInterval]
        const correctLetter = strArray[currentInterval]
        if (currentLetter !== correctLetter) {
          mangledWordArray[currentInterval] = correctLetter
        }
        return mangledWordArray.join('')
      })
    }, 75)
  }

  return { text: mangledWord, triggerMangle }
}

export default useMangle
