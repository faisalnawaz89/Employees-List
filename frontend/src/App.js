import Home from "./Components/Home/Home";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import EmployeeTable from "./Components/EmployeePage";
import LoginSignup from "./Components/Login";
import { GlobalStyle } from "./GlobalStyle/GlobalStyle";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { useLocation } from "react-router-dom";


function App() {

  const location = useLocation()

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<LoginSignup/>} />
        <Route path="/employeetable" element={<PrivateRoute element={<EmployeeTable />} />} />
        <Route path="/addemployee" element={<PrivateRoute element={<AddEmployee />} />} />
        <Route path="/editemployee/:id" element={<PrivateRoute element={<EditEmployee />} />} />
      </Routes>
      <GlobalStyle/>
    </>
  )
}

export default App;
