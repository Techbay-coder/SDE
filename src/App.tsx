import LoginPage from "./components/auth/LogingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/Layout";
import Header from "./layout/Header";
import Sidebar from "./layout/SideBar";
 export default function App() {
   
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/Layout" element={<Layout />}/>

        {/* <Route path="/sidebar" element={<Sidebar/>}/> */}
      </Routes>
    </Router>
  );
  
}



