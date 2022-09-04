export enum FORTUNE_TYPES {
  joke = 'jokes',
  quote = 'quotes',
  poem = 'poems'
}

export type Fortune = {
  type: FORTUNE_TYPES
  lines: string[]
  author?: string
  title?: string
}
