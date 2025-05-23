export interface DataUser {
  id: number
  name: string
  email: string
  dni: string
  nit: string
  phoneNumber: string
  lastName: string
}
export interface Payment {
  id: number
  orderId: number
  transactionId: string
  amount: number
  discount: number
  type: string
  issuingBank: string
  receivingBank: string
  reference: string
  date: string
  name: string
  userId: number
  description: string
  tax: number
  isPayment: boolean
}
export interface Product {
  id: number
  name: string
  price: number
  promotionalPrice: number
  code: string
  cost: number
}
export interface Item {
  id: number
  userId: number
  numberClient: string
  direction: string
  referencePoint: string
  observation: string
  time: string
  type: string
  amount: number
  valueTax: number
  amountWithoutTax: number
  tax: number
  products: ProductItem[]
  dataUser: DataUser
  payment: Payment
  createdAt: Date
}
export interface ProductItem {
  id: number
  orderId: number
  productId: number
  serviceId: number
  meetingId: number
  subscriptionId: number
  quantity: number
  sale_price: number
  detail: string
  createdAt: string
  updatedAt: string
  product: Product
}
export interface OrderA2 {
  codfmv: '03'
  id: number
  codcli: string
  fecmov: string
  monnet: number
  monmov: number
  impmov: number
  codved: 1
  nomcli: string
  telcl1: string
  email?: string
  dir1: string
  nrocontrol?: any
  forpag: string
}
export interface OrderProductA2 {
  idm: number
  id: number
  codart: string
  fecmov: string
  canart: number
  preart: number
  monimp: number
  pisv: number
  subtotal: string
}
export interface IRequestBody {
  fecha?: string
  wasSent?: number
  product?: boolean
  fe?: string
  usu?: string
  cla?: string
  bd?: string
  time?: string
}
