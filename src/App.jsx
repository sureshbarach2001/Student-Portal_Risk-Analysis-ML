import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboardPage from './pages/LandingPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import AuthPage from './pages/AuthPage';
import StudentProfilePage from './pages/ProfilePage';
import StudentGradePage from './pages/GradePage';
import StudentAttendancePage from './pages/AttendancePage';
import StudentDashboardPage from './pages/OverviewPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// A wrapper component to protect routes based on role
function ProtectedRoute({ children, allowedRole }) {
  const { role } = useAuth();

  // If no role is set (user hasn't logged in), redirect to login
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // If the user's role doesn't match the allowed role, redirect to a default page
  if (role !== allowedRole) {
    return role === 'Admin' ? (
      <Navigate to="/teacher-dashboard" replace />
    ) : (
      <Navigate to="/student-dashboard" replace />
    );
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Page (accessible to everyone, no protection) */}
          <Route path="/" element={<AuthPage />} />

          {/* Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRole="Student">
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-grades"
            element={
              <ProtectedRoute allowedRole="Student">
                <StudentGradePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-attendance"
            element={
              <ProtectedRoute allowedRole="Student">
                <StudentAttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-profile"
            element={
              <ProtectedRoute allowedRole="Student">
                <StudentProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin (Teacher) Routes */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute allowedRole="Admin">
                <TeacherDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute allowedRole="Admin">
                <TeacherProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;