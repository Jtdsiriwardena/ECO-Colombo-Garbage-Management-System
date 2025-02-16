import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignup from "./pages/user_signup";
import UserLogin from "./pages/user_login";
import UserDashboard from "./pages/user_dashboard";
import Complaints from "./pages/Complaints";
import ComplaintForm from "./pages/ComplaintForm";
import ManageAreaManagers from "./pages/manage_area_managers";
import AreaManagerLogin from "./pages/area_manager_login";
import ManagerDashboard from "./pages/manager_dashboard";
import ViewComplaint from "./pages/view_complaints";
import Analytics from "./pages/analytics";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<UserSignup />} /> 
        <Route path="/login" element={<UserLogin />} /> 
        <Route path="/dashboard" element={<UserDashboard />} /> 
        <Route path="/complaints" element={<Complaints />} /> 
        <Route path="/complaints-form" element={<ComplaintForm />} /> 
        <Route path="/view-complaints" element={<ViewComplaint />} /> 
        
        <Route path="/manage-area-managers" element={<ManageAreaManagers />} /> 
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> 
        <Route path="/manager-login" element={<AreaManagerLogin />} /> 
        <Route path="/analytics" element={<Analytics />} /> 
      </Routes>
    </Router>
  );
}

export default App;
