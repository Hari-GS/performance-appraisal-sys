import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Navbar from './Navbar'
import EmployeeAppraisalOverviewCard from './EmployeeAppraisalOverviewCard'
import SelfAppraisalProgressCard from './SelfAppraisalProgressCard'
import EvaluatorsCard from './EvaluatorCard'
import TopHeader from './TopHeader'

function EmployeeDashboard() {
    return (
        <div>
			<TopHeader/>
		    <div className="flex min-h-screen bg-primary">
		    	{/* Sidebar */}
			    <Sidebar role="employee"/>
			    {/* Main Content */}
			    <div className="flex flex-col flex-grow pl-64 pt-0">
				    <Header/>
					<div className='flex flex-row space-x-10'>
						<EmployeeAppraisalOverviewCard/>
						<SelfAppraisalProgressCard/>
					</div>
					<EvaluatorsCard/>
			    </div>
		    </div>
        </div>
    )
}

export default EmployeeDashboard
