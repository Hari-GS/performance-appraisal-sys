import './App.css';
import Home from './pages/Home';
import Dashboard from "./pages/Dashboard";
import Employees from './pages/Employees';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";
import Reviews from './pages/Reviews/Reviews';
import { Provider } from "react-redux";
import store from "./redux/store";
import AddEmployee from './components/AddEmployee';
import EmployeeAddition from './pages/EmployeeAddition';
import CreateForm from "./pages/Forms/CreateForm"
import FormsPage from './pages/Forms/FormsPage';
import TeamCreation from './pages/TeamCreation';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AppraisalsList from './pages/AppraisalsList';
import HeirarchyPage from './pages/HeirarchyPage';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManageAppraisal from './pages/ManageAppraisal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeCurrentAppraisal from './pages/EmployeeCurrentAppraisal';
import AppraisalDetailsForEmployee from './components/AppraisalDetailsForEmployee';
import AppraisalDetails from './pages/AppraisalDetails';
import SelfAppraisalPage from './pages/SelfAppraisalPage';
import PendingComments from './pages/PendingComments';
import SelfAppraisalCommentsPage from './pages/SelfAppraisalCommentsPage';
import AppraisalReports from './components/AppraisalReports';
import AppraisalParticipantsPage from './pages/AppraisalParticipantsPage';
import ParticipantReportPage from './pages/ParticipantReportPage';

function App() {
  return (
    <AuthProvider>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/hr-dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <AppraisalsList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews/manage/:id"
            element={
              <ProtectedRoute>
                <ManageAppraisal/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/addEmployee'
            element={
              <ProtectedRoute>
                <EmployeeAddition/>
              </ProtectedRoute>

            }
          />
          <Route
            path='/forms/*'
            element={
              <ProtectedRoute>
                <FormsPage/>
              </ProtectedRoute>

            }
          />
          <Route
            path='/add-team/*'
            element={
              <ProtectedRoute>
                <TeamCreation/>
              </ProtectedRoute>

            }
          />
          <Route
            path='/heirarchy'
            element={
              <ProtectedRoute>
                <HeirarchyPage/>
              </ProtectedRoute>

            }
          />
          <Route
            path='/employee/appraisal'
            element={
              <ProtectedRoute>
                <EmployeeCurrentAppraisal/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/employee/appraisal/:appraisalId'
            element={
              <ProtectedRoute>
                <AppraisalDetails/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/employee/self-appraisal/:appraisalId'
            element={
              <ProtectedRoute>
                <SelfAppraisalPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/employee/self-appraisal/comments/:appraisalId'
            element={
              <ProtectedRoute>
                <PendingComments/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/employee/self-appraisal/comments/:appraisalId/:employeeId'
            element={
              <ProtectedRoute>
                <SelfAppraisalCommentsPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/reports'
            element={
              <ProtectedRoute>
                <AppraisalReports/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/reports/:appraisalId'
            element={
              <ProtectedRoute>
                <AppraisalParticipantsPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/reports/:appraisalId/:participantId'
            element={
              <ProtectedRoute>
                <ParticipantReportPage/>
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* ✅ Toast container for global toast access */}
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Provider>
    </AuthProvider>
  );
}

export default App;
