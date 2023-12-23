export type Income = {
  key: number
  createdAt: Date
  note: string
  price: number
  type: string
  category: string
}

export type Expense = {
  key: React.Key
  createdAt: Date
  note: string
  price: number
  type: string
  category: string
}

export type Savings = {
  key: React.Key
  createdAt: Date
  note: string
  price: number
  type: string
}