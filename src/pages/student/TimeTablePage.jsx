import React from 'react';

const TimeTable = () => {
  const schedule = [
    { day: 'Monday', slots: ['Math 9:00 AM', 'Physics 11:00 AM', 'Chemistry 2:00 PM'] },
    { day: 'Tuesday', slots: ['English 10:00 AM', 'History 1:00 PM', 'Biology 3:00 PM'] },
    // Add more days as needed
  ];

  return (
    <div className="p-6">
      {/* Header Section with Underline */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
        <h1 className="text-2xl font-normal">Time Table</h1>
        <div className="flex gap-4">
          <a href="/student" className="text-blue-600 hover:text-blue-800">Home</a>
          <span className="text-gray-500">TimeTable</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedule.map((day) => (
              <tr key={day.day}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.day}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {day.slots.join(' | ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
