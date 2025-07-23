import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddTeam from '../components/AddTeam'
import { Route, Routes } from 'react-router-dom'
import AddTeamMember from '../components/AddTeamMember'

function TeamCreation() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex flex-col flex-grow pl-72 p-6 pt-20 bg-gray-100">
                <Navbar title="Add Team"/>
                <Routes>
                    <Route path='/' element={<AddTeam/>}/>
                    <Route path='/team-selection' element={<AddTeamMember/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default TeamCreation

