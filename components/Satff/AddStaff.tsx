'use server'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { UserI } from '@/ts'
import { saveUser } from '@/utils/actions/users'

const AddStaff = async () => {

    const saveUserTodb = async (formData: FormData) => {
        'use server'


        const userData: UserI = {
            name: formData.get('name') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            sex: formData.get('sex') as string ,
            martialStatus: formData.get('martialStatus') as string,
            contractType: formData.get('contractType') as string,
            contractures: formData.get('contractures') as string,
            dutyDays: formData.get('dutyDays') as string,
            salary: formData.get('salary') as string,
            conversionFactor: formData.get('conversionFactor') as string,
            branch: formData.get('branch') as string,
            payrollTaxCredit: formData.get('payrollTaxCredit') as string ,
            serivceMarketplaceOffers: formData.get('serivceMarketplaceOffers') as string,
            selfMadeChanges: formData.get('selfMadeChanges') as string,
            changeInPastShifts: formData.get('changeInPastShifts') as string,
            hasSightInto: formData.get('hasSightInto') as string,
            comments: formData.get('comments') as string
        }

        console.log(userData)
        await saveUser(userData)
    }

    return (
        <div>
            <form action={saveUserTodb} className="grid grid-cols-2 w-[70%] mt-10 ">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Name
                        </Label>
                        <Input type="text" name='name' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Last Name
                        </Label>
                        <Input type="text" name='lastName' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Email
                        </Label>
                        <Input type="text" name='email' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Password
                        </Label>
                        <Input type="text" name='password' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Sex
                        </Label>
                        <Input type="text" name='sex' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Martial Status
                        </Label>
                        <Input type="text" name='martialStatus' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Contract Type
                        </Label>
                        <Input type="text" name='contractType' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Contract Dates
                        </Label>
                        <Input type="text" name='contractDates' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Contractures
                        </Label>
                        <Input type="text" name='contractures' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Duty Days
                        </Label>
                        <Input type="text" name='name' className="col-span-2" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Salary
                        </Label>
                        <Input type="text" name='salary' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            ConversionFactor
                        </Label>
                        <Input type="text" name='conversionFactor' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Branch
                        </Label>
                        <Input type="text" name='branch' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Payroll Tax Credit
                        </Label>
                        <Input type="text" name='payrollTaxCredit' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Serivce Marketplace Offers
                        </Label>
                        <Input type="text" name='serivceMarketplaceOffers' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Self Made Changes
                        </Label>
                        <Input type="text" name='selfMadeChanges' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Change In Past Shifts
                        </Label>
                        <Input type="text" name='changeInPastShifts' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Has Sight Into
                        </Label>
                        <Input type="text" name='name' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right col-span-2">
                            Comments
                        </Label>
                        <Input type="text" name='name' className="col-span-2" />
                    </div>
                </div>
                <div>
                    <Button type='submit'>
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddStaff