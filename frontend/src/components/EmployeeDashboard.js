import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Navbar from './Navbar'

function EmployeeDashboard() {
    return (
        <div>
		    <div className="flex min-h-screen bg-primary">
		    	{/* Sidebar */}
			    <Sidebar role="employee"/>
			    {/* Main Content */}
			    <div className="flex flex-col flex-grow pl-72 p-6 pt-20">
				    <Header/>
			    </div>
		    </div>
		    <Navbar title="Employee Dashboard"/>
        </div>
    )
}

export default EmployeeDashboard
