import { Route, Routes } from "react-router";
import AuthForm from "./componenet/AuthForm";
import DashBoard from "./componenet/DashBoard";
import ProtectedRoute from "./componenet/ProtectedRoute";
import TagSearch from "./DashboardUI/TagSearch";
import Home from "./DashboardUI/Home";
import { ToastContainer } from "react-toastify";
import PromptEditor from "./DashboardUI/PromptEditor";
import MyPrompt from "./DashboardUI/MyPrompt";
import Reports from "./DashboardUI/Reports";
import Settings from "./DashboardUI/Settings";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center"/>

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
        <Route path="TagSearch" element={<TagSearch />} />
        <Route path="my-prompts" element={<MyPrompt />} />
        <Route path="prompt-editor" element={<PromptEditor />} />
        <Route path="calendar" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
    </>
  );
};

export default App;