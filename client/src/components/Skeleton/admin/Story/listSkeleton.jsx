import React from "react";

const StoryListSkeleton = () => {
  const rows = new Array(5).fill(null); // Adjust number of rows

  return (
    <tbody className="animate-pulse">
      {rows.map((_, index) => (
        <tr key={index} className="bg-white divide-x divide-gray-200">
          {/* Story Column */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-48 bg-gray-100 rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-4 w-10 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </td>

          {/* Author */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </td>

          {/* Category */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
          </td>

          {/* Read Time */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="space-y-1">
              <div className="h-3 w-20 bg-gray-100 rounded"></div>
              <div className="h-3 w-16 bg-gray-100 rounded"></div>
            </div>
          </td>

          {/* Published */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          </td>

          {/* Featured */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          </td>

          {/* Actions */}
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <div className="flex justify-end space-x-2">
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default StoryListSkeleton;
