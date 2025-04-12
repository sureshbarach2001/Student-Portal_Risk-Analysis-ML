import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TeacherDashboardPage from './pages/LandingPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import AuthPage from './pages/AuthPage';
import StudentProfilePage from './pages/ProfilePage';
import StudentGradePage from './pages/GradePage';
import StudentAttendancePage from './pages/AttendancePage';
import StudentDashboardPage from './pages/OverviewPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Placeholder components for new admin routes
function HighRiskMarksPage() {
  return <div className="p-8">High Risk Marks Page (Under Construction)</div>;
}

function HighMarksLowAttendancePage() {
  return <div className="p-8">High Marks / Low Attendance Page (Under Construction)</div>;
}

function PerformancePredictionPage() {
  return <div className="p-8">Performance Prediction Page (Under Construction)</div>;
}

function GradePredictionPage() {
  return <div className="p-8">Grade Prediction Page (Under Construction)</div>;
}

// Redirector component to handle post-login navigation
function Redirector() {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      if (role === 'Admin' || role === 'Teacher') {
        navigate('/high-risk-marks', { replace: true });
      } else if (role === 'Student') {
        navigate('/student-dashboard', { replace: true });
      }
    }
  }, [role, navigate]);

  return <AuthPage />;
}

// A wrapper component to protect routes based on role
function ProtectedRoute({ children, allowedRole }) {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  const isAllowed = Array.isArray(allowedRole)
    ? allowedRole.includes(role)
    : role === allowedRole;

  if (!isAllowed) {
    return role === 'Student' ? (
      <Navigate to="/student-dashboard" replace />
    ) : (
      <Navigate to="/high-risk-marks" replace />
    );
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Page with redirector */}
          <Route path="/" element={<Redirector />} />

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
            path="/high-risk-marks"
            element={
              <ProtectedRoute allowedRole={['Admin', 'Teacher']}>
                <TeacherDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/high-marks-low-attendance"
            element={
              <ProtectedRoute allowedRole={['Admin', 'Teacher']}>
                <HighMarksLowAttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance-prediction"
            element={
              <ProtectedRoute allowedRole={['Admin', 'Teacher']}>
                <PerformancePredictionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grade-prediction"
            element={
              <ProtectedRoute allowedRole={['Admin', 'Teacher']}>
                <GradePredictionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRole={['Admin', 'Teacher']}>
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