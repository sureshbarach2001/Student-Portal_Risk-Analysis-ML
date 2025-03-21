import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaChartBar, FaCalendarAlt, FaCog } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="fixed top-16 w-64 h-[calc(100vh-4rem)] bg-sidebar-bg p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-blue">LOGO</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-active-link text-primary-blue rounded-lg"
            >
              <FaExclamationTriangle className="mr-2" />
              Risk Identification
            </Link>
          </li>
          <li>
            <Link
              to="/high-risk-marks"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              <FaChartBar className="mr-2" />
              High Risk Marks
            </Link>
          </li>
          <li>
            <Link
              to="/attendance"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              <FaCalendarAlt className="mr-2" />
              Attendance
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;