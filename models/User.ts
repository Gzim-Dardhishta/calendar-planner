import { UserI } from '@/ts'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema<UserI>({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    sex: String,
    martialStatus: String,
    contractType: {
        type: String
        // required: [true, 'Please provide a contact type']
    },
    contractDates: {
        type: [Date]
        // required: true
    },
    contractures: String,
    dutyDays: String,
    salary: String,
    conversionFactor: String,
    branch: {
        type: String
    },
    payrollTaxCredit: String,
    serivceMarketplaceOffers: String,
    selfMadeChanges: String,
    changeInPastShifts: String,
    hasSightInto: String,
    comments: String
})

const User = mongoose.models?.users || mongoose.model('users', userSchema)

export default User