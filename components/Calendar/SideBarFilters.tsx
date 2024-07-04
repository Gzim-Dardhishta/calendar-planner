import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'

interface SideBarFiltersI {
    setHiddenFilters: (types: string[]) => void;
    closeModal: (c: boolean) => void
}

const SideBarFilters: FC<SideBarFiltersI> = ({ setHiddenFilters, closeModal }) => {
    const [unavailability, setUnavailability] = useState(false)
    const [onlyMyServices, setOnlyMyServices] = useState(false)
    const [selectAll, setSelectAll] = useState(false)
    const [showLayers, setShowLayers] = useState(false)
    const [guardianChecked, setGuardianChecked] = useState(false)

    const [types, setTypes] = useState<{ _id: string; name: string; color: string }[]>([])
    const [checkedTypes, setCheckedTypes] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('/api/types')
                if (response.status === 200) {
                    const fetchedTypes = response.data.data
                    setTypes(fetchedTypes)

                    const initialCheckedTypes = fetchedTypes.reduce((acc: { [key: string]: boolean }, type: { name: string }) => {
                        acc[type.name] = false
                        return acc
                    }, {})
                    setCheckedTypes(initialCheckedTypes)
                }
            } catch (error) {
                console.error('Failed to fetch types:', error)
            }
        }
        fetchTypes()
    }, [])

    const handleSelectAll = () => {
        const newSelectAll = !selectAll
        setSelectAll(newSelectAll)
        setGuardianChecked(newSelectAll)
        setCheckedTypes((prevCheckedTypes) => {
            const updatedCheckedTypes = { ...prevCheckedTypes }
            Object.keys(updatedCheckedTypes).forEach((key) => {
                updatedCheckedTypes[key] = newSelectAll
            })
            const hiddenTypes = newSelectAll ? Object.keys(updatedCheckedTypes) : []
            setHiddenFilters(hiddenTypes)
            return updatedCheckedTypes
        })
    }

    const toggleLayers = () => {
        setShowLayers(!showLayers)
        if (showLayers) {
            setGuardianChecked(false)
        }
    }

    const handleGuardianCheck = () => {
        const newGuardianChecked = !guardianChecked
        setGuardianChecked(newGuardianChecked)
        setCheckedTypes((prevCheckedTypes) => {
            const updatedCheckedTypes = { ...prevCheckedTypes }
            Object.keys(updatedCheckedTypes).forEach((key) => {
                updatedCheckedTypes[key] = newGuardianChecked
            })
            const hiddenTypes = newGuardianChecked ? Object.keys(updatedCheckedTypes) : []
            setHiddenFilters(hiddenTypes)
            return updatedCheckedTypes
        })
    }

    const handleTypeClickInternal = (typeName: string) => {
        setCheckedTypes((prevCheckedTypes) => {
            const updatedCheckedTypes = {
                ...prevCheckedTypes,
                [typeName]: !prevCheckedTypes[typeName]
            }
            const hiddenTypes = Object.keys(updatedCheckedTypes).filter(
                (key) => updatedCheckedTypes[key]
            )
            setHiddenFilters(hiddenTypes)
            return updatedCheckedTypes
        })
    }

    const handleTypeCheck = (typeName: string) => {
        setCheckedTypes((prevCheckedTypes) => {
            const updatedCheckedTypes = {
                ...prevCheckedTypes,
                [typeName]: !prevCheckedTypes[typeName]
            }
            const hiddenTypes = Object.keys(updatedCheckedTypes).filter(
                (key) => updatedCheckedTypes[key]
            )
            setHiddenFilters(hiddenTypes)
            return updatedCheckedTypes
        })
    }

    return (
        <div className="w-[300px] h-screen bg-gray-50 fixed top-0 left-0 z-50 shadow-lg px-4 border-r-2">
            <div className="float-right px-3 py-1 font-bold cursor-pointer" onClick={() => closeModal(false)}><AiOutlineCloseSquare size={28} /></div>
            <div className="flex ml-4 text-xl font-semibold p-1 pt-4">Filter Form</div>
            <div className="flex flex-col ml-4 p-1 mt-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={unavailability}
                        onChange={() => setUnavailability(!unavailability)}
                    />
                    <p>UnAvailability</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={onlyMyServices}
                        onChange={() => setOnlyMyServices(!onlyMyServices)}
                    />
                    <p>Only my services</p>
                </div>
            </div>
            <div className="flex ml-4 text-xl font-semibold p-1 mt-7">Schedules</div>
            <div className="flex flex-col ml-4 p-1 mt-4">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <p className="font-semibold">Select all layers</p>
                </div>
                <div className="flex items-center gap-2 px-2 mb-1">
                    <button onClick={toggleLayers} className="text-sm text-left">
                        {showLayers ? '▲' : '▼'}
                    </button>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={guardianChecked}
                            onChange={handleGuardianCheck}
                        />
                        <p>The guardians security</p>
                    </div>
                </div>
                {showLayers && (
                    <>
                        {types?.map((t, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 mb-2 px-2 opacity-95"
                                style={{ backgroundColor: t.color }}
                                onClick={() => handleTypeClickInternal(t.name)}
                            >
                                <input
                                    type="checkbox"
                                    checked={checkedTypes[t.name] || false}
                                    onChange={() => handleTypeCheck(t.name)}
                                />
                                <p>{t.name}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default SideBarFilters
