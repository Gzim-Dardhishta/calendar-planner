import { UserDTO } from '@/ts'

export const usersToUsersDTO = (user:any) => {
    const userDTO: UserDTO = {
        id: user.id,
        firstName: user.name,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        sex: user.sex,
        martialStatus: user.martialStatus,
        contractType: user.contractType,
        contractDates: user.contractDates,
        role: user.role,
        contractures: user.contractures,
        dutyDays: user.dutyDays,
        salary: user.salary,
        conversionFactor: user.conversionFactor,
        branch: user.branch,
        payrollTaxCredit: user.payrollTaxCredit,
        serivceMarketplaceOffers: user.serivceMarketplaceOffers,
        selfMadeChanges: user.selfMadeChanges,
        changeInPastShifts: user.changeInPastShifts,
        hasSightInto: user.hasSightInto,
        comments: user.comments
    }
    return userDTO
}