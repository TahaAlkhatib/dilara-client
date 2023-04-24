
export type Appointment = {
    _id: string
    patientId: string
    date: string
    status: 'waiting' | 'attended' | 'canceled' | 'skipped'
    notes: string
}