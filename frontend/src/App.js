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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
