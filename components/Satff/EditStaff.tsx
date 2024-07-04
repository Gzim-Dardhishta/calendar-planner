'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { UserDTO, UserI } from '@/ts'
import { redirect, useParams } from 'next/navigation'
import { Button } from '../ui/button'
import axios from 'axios'

const EditStaff = () => {

    const params = useParams<{ id: string }>()

    const [user, setUser] = useState<UserDTO>()
    console.log(user)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/staff/${params.id}`)
                if (response.status === 200) {
                    setUser(response.data.data)
                }
            } catch (error) {
                console.error('Failed to fetch types:', error)
            }
        }
        fetchUser()
    }, [])

    const saveUserTodb = async (formData: FormData) => {
        const startDate = formData.get('startDate') as string
        let endDate = formData.get('endDate') as string
      
        if (!endDate) {
            endDate = 'Not determined'
        }
      
        const userData = {
            _id: params.id,
            name: formData.get('name') as string,
            username: formData.get('username') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            sex: formData.get('sex') as string,
            martialStatus: formData.get('martialStatus') as string,
            contractType: formData.get('contractType') as string,
            contractDates: {
                startDate: startDate,
                endDate: endDate
            },
            contractures: formData.get('contractures') as string,
            role: formData.get('role') as string,
            dutyDays: formData.get('dutyDays') as string,
            salary: formData.get('salary') as string,
            conversionFactor: formData.get('conversionFactor') as string,
            branch: formData.get('branch') as string,
            payrollTaxCredit: formData.get('payrollTaxCredit') as string,
            serivceMarketplaceOffers: formData.get('serivceMarketplaceOffers') as string,
            selfMadeChanges: formData.get('selfMadeChanges') as string,
            changeInPastShifts: formData.get('changeInPastShifts') as string,
            hasSightInto: formData.get('hasSightInto') as string,
            comments: formData.get('comments') as string
        }
      
        try {
            const response = await axios.put(`/api/staff/${params.id}`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (e) {
            console.log(e)
        }
        redirect(`/staff/${params.id}`)
    }
    return (
        <div>
            <form action={saveUserTodb} className="grid grid-cols-2 w-[70%] mt-10 ">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Name
                        </Label>
                        <Input type="text" value={user?.firstName} name='name' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right col-span-2">
                            Last Name
                        </Label>
                        <Input type="text" value={user?.lastName} name='lastName' className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right col-span-2">
                            Email
                        </Label>
                        <Input type="text" name='email' value={user?.email} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right col-span-2">
                            Username
                        </Label>
                        <Input type="text" name='username' value={user?.username} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sex" className="text-right col-span-2">
                            Sex
                        </Label>
                        <Input type="text" name='sex' value={user?.sex} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="martialStatus" className="text-right col-span-2">
                            Martial Status
                        </Label>
                        <Input type="text" name='martialStatus' value={user?.martialStatus} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contractType" className="text-right col-span-2">
                            Contract Type
                        </Label>
                        <Input type="text" name='contractType' value={user?.contractType} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right col-span-2">
                            Start Date
                        </Label>
                        <Input type="date" name='startDate' value={user?.contractDates.startDate} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right col-span-2">
                            End Date
                        </Label>
                        <Input type="date" name='endDate' value={user?.contractDates.endDate} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contractures" className="text-right col-span-2">
                            Contractures
                        </Label>
                        <Input type="text" name='contractures' value={user?.contractures} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dutyDays" className="text-right col-span-2">
                            Duty Days
                        </Label>
                        <Input type="text" name='dutyDays' value={user?.dutyDays} className="col-span-2" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right col-span-2">
                            Role
                        </Label>
                        <Input type="text" name='role' value={user?.role} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="salary" className="text-right col-span-2">
                            Salary
                        </Label>
                        <Input type="text" name='salary' value={user?.salary} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="conversionFactor" className="text-right col-span-2">
                            ConversionFactor
                        </Label>
                        <Input type="text" name='conversionFactor' value={user?.conversionFactor} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="branch" className="text-right col-span-2">
                            Branch
                        </Label>
                        <Input type="text" name='branch' value={user?.branch} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="payrollTaxCredit" className="text-right col-span-2">
                            Payroll Tax Credit
                        </Label>
                        <Input type="text" name='payrollTaxCredit' value={user?.payrollTaxCredit} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="serivceMarketplaceOffers" className="text-right col-span-2">
                            Serivce Marketplace Offers
                        </Label>
                        <Input type="text" name='serivceMarketplaceOffers' value={user?.serivceMarketplaceOffers} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="selfMadeChanges" className="text-right col-span-2">
                            Self Made Changes
                        </Label>
                        <Input type="text" name='selfMadeChanges' value={user?.selfMadeChanges} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="changeInPastShifts" className="text-right col-span-2">
                            Change In Past Shifts
                        </Label>
                        <Input type="text" name='changeInPastShifts' value={user?.changeInPastShifts} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hasSightInto" className="text-right col-span-2">
                            Has Sight Into
                        </Label>
                        <Input type="text" name='hasSightInto' value={user?.hasSightInto} className="col-span-2" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="comments" className="text-right col-span-2">
                            Comments
                        </Label>
                        <Input type="text" name='comments' value={user?.comments} className="col-span-2" />
                    </div>
                </div>
                <div></div>
                <div className='w-1/2 float-right'>
                    <Button type='submit' className='bg-[#eb1e8d] text-white w-full float-right mt-5'>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditStaff