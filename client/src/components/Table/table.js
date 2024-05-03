import React, { useState } from "react";

export const UserTable = ({ users }) => {
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Function to handle sorting
    const handleSort = (key) => {
        if (sortBy === key) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortDirection("asc");
        }
    };

    // Function to handle pagination
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Apply sorting
    let sortedUsers = [...users];
    if (sortBy) {
        sortedUsers = sortedUsers.sort((a, b) => {
            if (sortDirection === "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }

    // Apply pagination
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    return (
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col h-screen">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white sticky top-0">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("name")}
                                >
                                    Name
                                    {sortBy === "name" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("email")}
                                >
                                    Email
                                    {sortBy === "email" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("age")}
                                >
                                    Age
                                    {sortBy === "age" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("country")}
                                >
                                    Country
                                    {sortBy === "country" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort("subscription")}
                                >
                                    Subscription
                                    {sortBy === "subscription" && (
                                        <span className="ml-1">
                                            {sortDirection === "asc" ? "▲" : "▼"}
                                        </span>
                                    )}
                                </th>
                                {/* Add more headers for other columns */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.subscription ? "Yes" : "No"}
                                    </td>
                                    {/* Add more columns based on user data */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* flex flex-col h-screen overflow-x-auto fixed top-0 left-0 right-0 bottom-0 justify-center items-center */}
                    <div className="mt-4 flex flex-col h-screen top-0 left-0 right-0 bottom-0 justify-between items-center">
                    {/* <div className="mb-6 flex flex-col h-screen fixed top-0 left-0 right-0 bottom-0 justify-end items-center"> */}
                        <div className="flex items-center">
                            <label htmlFor="rowsPerPage" className="mr-2">
                                Rows per page:
                            </label>
                            <select
                                id="rowsPerPage"
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
                                className="px-2 py-1 border rounded mr-4 bg-white shadow"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                            <button
                                onClick={() => handleChangePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300 mr-2"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handleChangePage(currentPage + 1)}
                                disabled={endIndex >= sortedUsers.length}
                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTable;
