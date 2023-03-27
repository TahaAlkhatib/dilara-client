
export type Appointment = {
    _id: string
    patientId: string
    date: string
    status: 'attended' | 'canceled' | 'skipped'
    notes: string
}