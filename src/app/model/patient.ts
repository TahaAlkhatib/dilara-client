
export type Visit = {
    date: Date
    type: 'scheduled' | 'first' | 'urgent'
    notes: string
}

export type Patient = {
    _id: string
    name: string
    fatherName: string
    motherName: string
    dateOfBirth: Date
    picture: any[]
    registerDate: Date
    notes: string

    subscriptionType: 'monthly' | 'one time'
    subscriptionFees:number

    visits: Visit[]
}

