export type IncomeExpense = {
  key: number
  createdAt: Date
  note: string
  price: number
  type: string
  category: string
}

export type Savings = {
  key: React.Key
  createdAt: Date
  deposit: number
  present_value: number
  interest: number
  total_value: number
}