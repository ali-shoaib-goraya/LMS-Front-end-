import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { sampleCourses } from '../../MockData/CourseData';
import Navbar from '../../components/student/Navbar';
import Sidebar from '../../components/student/Sidebar';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCourses(sampleCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const showDashboardContent = location.pathname === '/student';

  if (loading && showDashboardContent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar onMenuClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed left-0 top-0 bottom-0 w-44">
          <Sidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 mt-16 ${isSidebarVisible ? 'ml-44' : 'ml-0'} overflow-y-auto`}
      >
        <div className="p-6 bg-gray-100 min-h-full">
          {showDashboardContent ? (
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
                <h1 className="text-3xl font-normal">Ongoing Courses</h1>
                <div className="flex gap-4">
                  <a
                    href="/student"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Home
                  </a>
                  <span className="text-gray-500">Ongoing Courses</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
