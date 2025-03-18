import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ReviewSection from '../components/ReviewSection'

function Reviews() {
    return (
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
            <div className="flex flex-col flex-grow pl-72 p-6 bg-gray-100 pt-20">
                <Navbar title="Reviews"/>
                <ReviewSection/>
            </div>
        </div>
    )
}

export default Reviews
