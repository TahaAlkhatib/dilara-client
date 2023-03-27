
export * from './patient'
export * from './appointment'
export * from './payment'
export * from './settings'
export * from './notifications'
export * from './permission-record'



export const DepartmentManagerRole = 'dep-manager'
export const ManagementRole = 'manager'
export const AccountantRole = 'accountant'



export type Role = {
    _id: string
    name: string
}