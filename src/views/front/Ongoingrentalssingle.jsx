import React from 'react'
import { useState } from 'react'
import aqua from '../../assets/vehicles/aqua.png'
import { Button } from '../../components/ui/button'

function Ongoingrentalssingle() {
    const [rating, setRating] = useState(0) // State for tracking the star rating

    // Function to handle star click and update the rating state
    const handleStarClick = (value) => {
        setRating(value)
    }

    // Example JSON object
    const rentalData = {
        reservationId: 'R001',
        name: 'Alex Fernando',
        vehicleName: 'Toyota Aqua',
        pickupDate: '21.12.2023',
        pickupTime: '10.30 AM',
        dropOffDate: '02.01.2024',
        dropOffTime: '11.00 AM',
        reservationStatus: 'Pending'
    }

    return (
        <>
            <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mb-1 ">
                <div className="my-16 lg:mx-36">
                    <h3 className="pb-6 text-l text-gray-950 font-semibold">Rental Summary</h3>
                    <div className="pb-8 flex items-center">
                        <img src={aqua} alt="car" className="w-32 h-18 rounded-full shadow-lg mr-12" />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold text-gray-950 mb-1">{rentalData.vehicleName}</h1>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 border-gray-700 rounded-full fill-current ${index < rating ? 'text-yellow-400' : 'text-gray-100'}`}
                                        viewBox="0 0 24 24"
                                        onClick={() => handleStarClick(index + 1)}
                                    >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        <path d="M0 0h24v24H0z" fill="none" />
                                    </svg>
                                ))}
                                <p className="text-gray-500 text-xs">10+ Reviewer</p>
                            </div>
                        </div>
                    </div>
                    <hr className="pb-3 border-t-2 border-stone-200 mx-5" />
                    <div className="pt-8 flex justify-between">
                        <p className="text-gray-500">Reservation ID </p>
                        <p className="font-semibold">{rentalData.reservationId}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Name</p>
                        <p className="font-semibold">{rentalData.name}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Pick-Up Date </p>
                        <p className="font-semibold">{rentalData.pickupDate}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Pick-Up Time</p>
                        <p className="font-semibold">{rentalData.pickupTime}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Drop-Off Date</p>
                        <p className="font-semibold">{rentalData.dropOffDate}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Drop-Off Time</p>
                        <p className="font-semibold">{rentalData.dropOffTime}</p>
                    </div>
                    <div className="pt-3 flex justify-between">
                        <p className="text-gray-500">Reservation Status </p>
                        <button className="bg-red-600 rounded-xl font-semibold text-gray-50 text-xs pt-1 pb-1 pr-2 pl-2">
                            {rentalData.reservationStatus}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full bg-white rounded-xl shadow-lg mt-3 mb-8">
                <div className="mr-20 ml-20 my-10 lg:mx-36">
                    <p className="text-xs text-gray-500 flex items-start pb-3">
                        Please refer to the Reservation Policy for further details
                    </p>
                    <p className="text-s text-gray-500 flex items-start font-semibold pb-3">
                        *Reservation Cancellation made three(3) days or less prior to arrival date are non-refundable
                    </p>
                    <hr className="pb-3" />
                    <Button className="bg-red-600 rounded-xl font-semibold text-gray-50 text-xs pt-1 pb-1 pr-2 pl-2">
                        Cancel Reservation
                    </Button>
                    <div className="flex items-start">
                        <div className="mt-6 text-s text-gray-500 flex items-start font-semibold mr-1">
                            Feel free to contact
                        </div>
                        <div className=" mt-6 text-s text-indigo-800 flex items-start font-semibold mr-1">
                            vehiclehub@example.com
                        </div>
                        <div className="mt-6 text-s text-gray-500 flex items-start font-semibold">
                            with any questions.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ongoingrentalssingle
