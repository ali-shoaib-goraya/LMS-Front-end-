import React, { useState } from "react";
import {mockSemesters} from "../../../MockData/mockSemesters";
import SemesterForm from "../Forms/SemesterForm"; // Assuming you have a form component
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const SemesterTable = () => {
  const [semesters] = useState(mockSemesters);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    year: "",
    startDate: "",
    endDate: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedSemesters((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((semesterId) => semesterId !== id)
        : [...prevSelected, id]
    );
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredSemesters = semesters.filter((semester) =>
    Object.keys(filters).every((key) =>
      filters[key] ? semester[key]?.toString().toLowerCase().includes(filters[key].toLowerCase()) : true
    )
  );

  const totalItems = filteredSemesters.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSemesters = filteredSemesters.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Semester List</h2>
      </div>

      {showForm ? (
        <SemesterForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Add Semester
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                <th className="border border-gray-300 px-4 py-3">
                  Name
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, "name")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">Year
                <input
                    type="text"
                    value={filters.academicYear}
                    onChange={(e) => handleFilterChange(e, "academicYear")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">Start Date
                <input
                    type="text"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange(e, "startDate")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">End Date
                <input
                    type="text"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange(e, "endDate")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSemesters.length > 0 ? (
                currentSemesters.map((semester, index) => (
                  <tr key={semester.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedSemesters.includes(semester.id)}
                        onChange={() => handleCheckboxChange(semester.id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{semester.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{semester.academicYear}</td>
                    <td className="border border-gray-300 px-4 py-3">{semester.startDate}</td>
                    <td className="border border-gray-300 px-4 py-3">{semester.endDate}</td>
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
                  <td colSpan="7" className="text-center text-gray-600 py-4">
                    No semesters found.
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

export default SemesterTable;
