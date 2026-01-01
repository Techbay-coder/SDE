import LoginPage from "./components/auth/LogingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/Layout";
import UserManagement from "./pages/userManagement";
//import {UserRole} from "@/types";
//import UserManagement from "./pages/userManagement";

//  export default function App() {
   
//   return (
//      <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
        
//         <Route path="/Layout" element={<Layout />}>
//           <Route index element={<Navigate to="/user-Management" replace />} />
//         </Route>
//            <Route path="/user-Management" element={<UserManagement />} />
//             {/* <Route path="users" element={
//               // <ProtectedRoute allowedRoles={['SGC']}>
//                 <UserManagement /> */}
//               {/* // </ProtectedRoute>
//             } /> */}
 

//         {/* <Route path="/sidebar" element={<Sidebar/>}/> */}
//       </Routes>
//     </Router>
//   );
  
// }
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Parent Route */}
        <Route path="/layout" element={<Layout />}>
          {/* This handles the redirect when you arrive at /layout */}
          {/* <Route index element={<Navigate to="user-management" replace />} /> */}
          
          {/* Defined Routes */}
          <Route path="user-management" element={<UserManagement />} />
          {/* <Route path="audit-logs" element={<AuditLogs />} /> */}
        </Route>

        {/* --- THE FIX --- */}
        {/* If the app looks for "/userManagement", redirect it to the correct path inside the layout */}
        <Route path="/user-Management" element={<Navigate to="/layout/user-management" replace />} />
        
       
      </Routes>
    </Router>
  );
}


