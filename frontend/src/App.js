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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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
                <Reviews/>
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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
