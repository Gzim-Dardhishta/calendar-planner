'use client'

import React, { FC } from 'react'
import { Input } from '../views'
import PublicLayout from '../layouts/PublicLayout'
import { AccountInfoI } from '@/ts'

const AccountInfo:FC<AccountInfoI> = ({ user }) => {

    return (
        <PublicLayout title='User Profile'>
            <div className="border mt-8 rounded-lg p-8 w-3/4 mx-auto divide-y">
                <div className="flex gap-10">
                    <div className="w-1/4">
                        Personal Info
                    </div>

                    <div className="w-3/4">
                        <div className="flex items-center gap-5">
                            <div className="border rounded-md bg-gray-100 p-14"></div>
                            <div><button className="p-2 bg-slate-100 rounded">Change Avatar</button></div>
                        </div>
                        <div className='mt-8'>
                            <div className="flex gap-4">
                                <Input placeholder='' setValue={() => { console.log()}} type='text' value={user?.firstName + ' ' + user?.lastName} label='Full Name' input='input' />
                                <Input placeholder='' setValue={() => {}} type='email' value={user?.email as string} label='Email' input='input' />
                                <Input placeholder='' setValue={() => {}} type='text' value={user?.role as string} label='Role' input='input' />
                            </div>
                            <div className="flex gap-4">
                                <Input placeholder='' setValue={() => {}} type='text' value={user?.sex as string} label='Sex' input='input' />
                                <Input placeholder='' setValue={() => {}} type='text' value={user?.martialStatus as string} label='Marital status' input='input' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-10 mt-8 py-5'>
                    <div className="w-1/4">
                    Contact
                    </div>

                    <div className='w-3/4'>
                        <div className="flex gap-4">
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.contractType as string} label='Contract type' input='input' />
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.contractDates.startDate as string + user?.contractDates.endDate as string} label='Contract dates' input='input' />
                        </div>
                        <div className="flex gap-4">
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.contractures as string} label='Contractures' input='input' />

                            <Input placeholder='' setValue={() => {}} type='text' value={user?.dutyDays as string} label='Duty days' input='input' />
                        </div>
                        <div className="flex gap-4">
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.salary as string} label='Salary' input='input' />
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.conversionFactor as string} label='Conversion factor' input='input' />
                        </div>
                        <div className="flex gap-4">
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.branch as string} label='Branch' input='input' />
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.payrollTaxCredit as string} label='Payroll tax credit' input='input' />
                        </div>
                    </div>
                </div>

                <div className='flex gap-10 mt-8 py-5'>
                    <div className="w-1/4">
                        Personal Files
                    </div>

                    <div className="3/4">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                            </>
                            <input 
                                id="dropzone-file"
                                type="file" 
                                className="hidden"
                                onChange={(e: any) => {}}/>
                        </label>
                    </div>
                </div>
                <div className='flex gap-10 mt-8 py-5'>
                    <div className="w-1/4">
                        Training Overview {'(100% Completed)'}
                    </div>

                    <div className="3/4">
                        <div className='w-full border flex gap-6 items-center p-3'>
                            <div className='w-fit'>
                            Created login deatils
                            </div>
                            <div className='w-fit'>
                            Completed on March 05, 2024
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-10 mt-8 py-5'>
                    <div className="w-1/4">
                        Notification
                    </div>

                    <div className="3/4">
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder='' setValue={() => { console.log()}} type='text' value={user?.serivceMarketplaceOffers as string} label='Services marketplace offers' input='input' />
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.selfMadeChanges as string} label='Self-made changes' input='input' />
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.changeInPastShifts as string} label='Changes in past shifts' input='input' />
                        </div>
                    </div>
                </div>

                <div className='flex gap-10 mt-8 py-5'>
                    <div className="w-1/4">
                        Institutions
                    </div>

                    <div className="3/4">
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder='' setValue={() => { console.log()}} type='text' value={user?.hasSightInto as string} label='Has insight into' input='input' />
                            <Input placeholder='' setValue={() => {}} type='text' value={user?.comments as string} label='Comments' input='input' />
                        </div>
                        <div className='underline'>Export your work schedule</div>
                        <div className='underline'>Change username and password</div>
                        <div className='underline'>Change calendar preferences</div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default AccountInfo