import React from 'react'
import AppraisalOverview from '../components/AppraisalOverview'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { request } from '../helpers/axios_helpers'
import TopHeader from '../components/TopHeader'

function ManageAppraisal() {
    const { id } = useParams();
    const [appraisal, setAppraisal] = useState(null);

    useEffect(() => {
        const fetchAppraisal = async () => {
          try {
            const response = await request('GET', `/api/appraisals/${id}`);
            setAppraisal(response.data);
          } catch (err) {
            console.error('Failed to fetch appraisal details', err);
          }
        };
    
        fetchAppraisal();
    }, [id]);

    return (
        <div>
          <TopHeader breadcrumbs={["Manage Appraisals","Control"]}/>
          <div className="flex">
            <Sidebar role={"hr"}/>
      
            <div className="flex flex-col flex-grow md:pl-64 pl-0 p-6 bg-primary">
              {appraisal ? (
                <AppraisalOverview appraisal={appraisal} setAppraisal={setAppraisal} />
              ) : (
                <p className="text-black">Loading appraisal...</p>
              )}
            </div>
          </div>
        </div>
      );
}

export default ManageAppraisal
