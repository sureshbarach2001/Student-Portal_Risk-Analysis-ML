import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaCalendarAlt, FaChartBar, FaUser, FaExclamationTriangle, FaChartLine, FaCog } from 'react-icons/fa';

function Sidebar({ activePage }) {
  const { role } = useAuth();

  // Define navigation links based on role
  const studentLinks = [
    { path: '/student-dashboard', name: 'Dashboard', icon: FaTachometerAlt, key: 'dashboard' },
    { path: '/student-attendance', name: 'Attendance', icon: FaCalendarAlt, key: 'attendance' },
    { path: '/student-grades', name: 'Grades', icon: FaChartBar, key: 'grades' },
    { path: '/student-profile', name: 'Profile', icon: FaUser, key: 'profile' },
  ];

  const adminLinks = [
    { path: '/high-risk-marks', name: 'At-Risk Identification', icon: FaExclamationTriangle, key: 'high-risk-marks' },
    { path: '/high-marks-low-attendance', name: 'High Marks / Low Attendance', icon: FaChartBar, key: 'high-marks-low-attendance' },
    { path: '/performance-prediction', name: 'Performance Prediction', icon: FaChartBar, key: 'performance-prediction' },
    { path: '/grade-prediction', name: 'Grade Prediction', icon: FaChartLine, key: 'grade-prediction' },
    { path: '/settings', name: 'Settings', icon: FaCog, key: 'settings' },
  ];

  const links = role === 'Admin' ? adminLinks : studentLinks;

  return (
    <aside className="fixed top-16 w-64 h-[calc(100vh-4rem)] bg-blue-50 p-6 flex flex-col">
      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {links.map(({ path, name, icon: Icon, key }) => (
            <li key={key}>
              <Link
                to={path}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activePage === key
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="mr-2 w-5 h-5" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;