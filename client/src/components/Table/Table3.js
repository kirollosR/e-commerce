import React, { useState } from "react";

export const Table3 = ({ data, canAdd, pageName }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // Add this line

  let columns = [];
  if (data.length > 0) {
    // Get keys from the first user object
    const keys = Object.keys(data[0]);
    console.log(keys);

    // Map keys to columns array
    columns = keys.map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      key: key,
    }));
  }

  // Function to handle sorting
  const handleSort = (key) => {
    if (sortBy === key) {
      // If the current sort key is clicked again, cycle to the next sort direction
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection("");
        setSortBy("");
      }
    } else {
      // If a new sort key is clicked, start with ascending sort
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  // Function to handle pagination
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // Function to handle search
  const handleSearch = (event) => {
    // Add this function
    setSearchTerm(event.target.value);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Apply sorting
  let sortedUsers = [...data];
  if (sortBy) {
    sortedUsers = sortedUsers.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else if (sortDirection === "desc") {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      } else {
        // If sortDirection is "", return the data in its original order
        return data;
      }
    });
  }

  // Apply search filtering
  if (searchTerm) {
    sortedUsers = sortedUsers.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Apply pagination
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
  return (
    <div class="bg-white p-8 rounded-md w-full">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{pageName}s List:</h2>
          <div class="w-full md:w-1/4">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
          <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            {canAdd && (
              <button
                type="button"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  class="h-5 w-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add {pageName}
              </button>
            )}
          </div>
        </div>
        <div class="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((column) => (
                  <th
                    scope="col"
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.name}
                    {sortBy === column.key
                      ? sortDirection === "asc"
                        ? " ⬆"
                        : " ⬇"
                      : " ⬍"}
                  </th>
                ))}
                <th
                  scope="col"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {paginatedUsers.map((element) => (
                <tr key={element.id}>
                  {columns.map((column) => (
                    <td class="px-5 py-4">{element[column.key]}</td>
                  ))}
                  <td>
                    <button class="px-1 py-1 cursor-pointer active:scale-[.97] hover:bg-red-500 text-white rounded-lg text-[15px]">
                      <svg
                        class="w-6 h-6 text-red-500 hover:text-white dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav class="" aria-label="Table navigation">
          <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <div>
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
            </div>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                class="px-3 py-1 shadow-lg shadow-gray-500/50 bg-black text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
              >
                Previous
              </button>
              &nbsp; &nbsp;
              <button
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={endIndex >= sortedUsers.length}
                class="px-3 py-1 shadow-lg shadow-gray-500/50 bg-black text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
              >
                Next
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Table3;
