import { useState } from "react";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard"; // Import the ProfileCard component
import profile from '../images/profile-placeholder.jpg';

const employees = [
  { 
    id: 1, 
    name: "Abhinaya K", 
    role: "UI/UX Designer", 
    img: profile,
    email: "abhinaya.k@cybervault.co",
    dob: "22/11/1999",
    doj: "22/03/2024",
    gender: "Female",
    maritalStatus: "Unmarried",
    bloodGroup: "O+",
    mobile: "+91 1234567890",
    address: "XXXXXXXXXXXXXXXXXXXXX",
    personalEmail: "xxxxxxx@gmail.com",
    emergencyMobile: "+91 1223456789",
    holderName: "Kannan D K"
  },
  { 
    id: 2, 
    name: "Balaji L", 
    role: "Software Engineer", 
    img: profile,
    email: "balaji.l@cybervault.co",
    dob: "15/06/1998",
    doj: "10/01/2022",
    gender: "Male",
    maritalStatus: "Married",
    bloodGroup: "B+",
    mobile: "+91 9876543210",
    address: "XXXXXXXXXXXXXXXXXXXXX",
    personalEmail: "balaji123@gmail.com",
    emergencyMobile: "+91 9898989898",
    holderName: "Lakshmi B"
  },
  { 
    id: 3, 
    name: "Monika K", 
    role: "Product Manager", 
    img: profile,
    email: "monika.k@cybervault.co",
    dob: "10/09/2000",
    doj: "05/05/2023",
    gender: "Female",
    maritalStatus: "Unmarried",
    bloodGroup: "A+",
    mobile: "+91 9988776655",
    address: "XXXXXXXXXXXXXXXXXXXXX",
    personalEmail: "monikak@gmail.com",
    emergencyMobile: "+91 9112233445",
    holderName: "Krishna M"
  },
  { 
    id: 4, 
    name: "Saravanan L", 
    role: "Senior Developer", 
    img: profile,
    email: "saravanan.l@cybervault.co",
    dob: "05/12/1995",
    doj: "20/07/2021",
    gender: "Male",
    maritalStatus: "Married",
    bloodGroup: "AB+",
    mobile: "+91 9876543211",
    address: "XXXXXXXXXXXXXXXXXXXXX",
    personalEmail: "saravanl@gmail.com",
    emergencyMobile: "+91 9191919191",
    holderName: "Priya S"
  }
];

const EmployeeProfiles = () => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (query) => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
        {filteredEmployees.map((employee) => (
          <div 
            key={employee.id} 
            className="bg-white rounded-lg shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition duration-300"
            onClick={() => setSelectedEmployee(employee)}
          >
            <img
              src={employee.img}
              alt={employee.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{employee.name}</h3>
            <p className="text-gray-500">{employee.role}</p>
          </div>
        ))}
      </div>

      {/* Profile Card Modal */}
      {selectedEmployee && (
        <ProfileCard 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default EmployeeProfiles;
