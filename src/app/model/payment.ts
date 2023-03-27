
export type Payment = {
    _id: string
    patientId: string
    amount: number
    dueDate: Date
    payDate?: Date
    status: 'payed' | 'waiting' | 'canceled'
    notes: string
}