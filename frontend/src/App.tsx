import { Route, Routes } from "react-router";
import AuthForm from "./componenet/AuthForm";
import DashBoard from "./componenet/DashBoard";
import ProtectedRoute from "./componenet/ProtectedRoute";
import Reports from "./componenet/Reports";
import Home from "./componenet/DashboardUI/Home";

const App = () => {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<AuthForm />} />

      {/* Dashboard Layout with Sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      >
        {/* Default Dashboard Content */}
        <Route index element={<Home />} />

        {/* Sub Pages */}
        <Route path="reports" element={<Reports />} />
        <Route path="recruitment" element={<div>Recruitment Page</div>} />
        <Route path="onboarding" element={<div>Onboarding Page</div>} />
        <Route path="calendar" element={<div>Calendar Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;