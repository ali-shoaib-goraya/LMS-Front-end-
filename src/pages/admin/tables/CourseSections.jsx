import React, { useState } from "react";
import { mockCourses } from "../../../MockData/mockCourses";
import CoursesSectionForm from "../Forms/CoursesSectionForm";
import SelectSemester from "../Forms/BulkCourses1"; // Importing Bulk Courses Form
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const CourseSections = () => {
  const [courses] = useState(mockCourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false); // New State for Bulk Form

  const [filters, setFilters] = useState({
    name: "",
    course: "",
    semester: "",
    school: "",
    teacher: "",
    department: "",
    section: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((courseId) => courseId !== id)
        : [...prevSelected, id]
    );
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredCourses = courses.filter((course) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? course[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Course Sections</h2>
      </div>

      {/* Conditional Rendering for Forms */}
      {showForm ? (
        <CoursesSectionForm onBack={() => setShowForm(false)} />
      ) : showBulkForm ? (
        <SelectSemester onBack={() => setShowBulkForm(false)} />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowForm(true)}
              >
                Create Course Sections
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowBulkForm(true)} // Opens Bulk Form
              >
                Add Courses in Bulk
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                {["name", "course", "semester", "school", "teacher", "department", "section"].map((key) => (
                  <th key={key} className="border border-gray-300 px-4 py-3">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <input
                      type="text"
                      value={filters[key]}
                      onChange={(e) => handleFilterChange(e, key)}
                      className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                    />
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course, index) => (
                  <tr key={course.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleCheckboxChange(course.id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    {["name", "course", "semester", "school", "teacher", "department", "section"].map((key) => (
                      <td key={key} className="border border-gray-300 px-4 py-3">{course[key]}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                      <button className="hover:opacity-80" onClick={() => setShowForm(true)}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button className="hover:opacity-80">
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-gray-600 py-4">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border rounded bg-gray-200 mr-2"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 border rounded mx-1 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border rounded bg-gray-200 ml-2"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSections;
