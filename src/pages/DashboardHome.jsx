import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminCourseCard from './AdminCourseCard';
import { sampleCourses } from '../MockData/CourseData';

const DashboardHome = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const showDashboardContent = location.pathname === '/dashboard';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setCourses(sampleCourses);
        setFilteredCourses(sampleCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(courses); // No filtering logic, just display all courses
  }, [courses]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase().trim();
    const filtered = courses.filter((course) => 
      (course.title?.toLowerCase() || '').includes(query) || 
      (course.code?.toLowerCase() || '').includes(query)
    );
    setFilteredCourses(filtered);
  };

  // Group courses by semester
  const coursesByTerm = filteredCourses.reduce((acc, course) => {
    const term = course.term || 'Unknown Term';
    if (!acc[term]) {
      acc[term] = [];
    }
    acc[term].push(course);
    return acc;
  }, {});

  if (loading && showDashboardContent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="pt-6 px-6">
        {showDashboardContent ? (
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <h1 className="text-3xl font-normal">Department Course Sections</h1>
              <div className="flex items-center gap-4 text-blue-600">
                <a href="/dashboard" className="hover:text-blue-800">Home</a>
                <span className="border-l h-4 border-gray-400" />
                <a href="/dashboard" className="hover:text-blue-800">Dashboard</a>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex justify-end mb-6">
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                className="w-48 p-2 border border-gray-300 rounded-full"
              />
            </div>

            {/* Course Sections by Term */}
            {Object.entries(coursesByTerm).map(([term, termCourses]) => (
              <div key={term} className="mb-8">
                <h2 className="text-xl font-medium text-gray-800 mb-4">{term}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {termCourses.map((course) => (
                    <AdminCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      
    </div>
  );
};

export default DashboardHome;
