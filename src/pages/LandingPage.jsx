import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import StudentTable from '../components/StudentTable';
import FileUpload from '../components/FileUpload';
import ManualForm from '../components/ManualForm';

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 ml-64 mt-16">
          {/* Statistics Cards */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-dark-text mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="High Risk" value="14" change="+40%" trend="up" />
              <StatCard title="Medium Risk" value="26" change="-10%" trend="down" />
              <StatCard title="Low Risk" value="43" change="+20%" trend="up" />
            </div>
          </div>

          {/* At-Risk Students Table */}
          <div className="mb-6">
            <StudentTable />
          </div>

          {/* Data Upload and Manual Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload />
            <ManualForm />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;