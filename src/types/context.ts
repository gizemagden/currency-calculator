export type configType = {
  settings: {
    amount: number,
    baseCurrency: string,
    targetCurrency: string
  }
}

export type Action = {
  type: string,
  value: string,
  props: any
}
