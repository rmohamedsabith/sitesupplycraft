import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SearchInput = ({ users, setFilterUser }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    console.log(search)
    if (search.trim() === "") {
      // If search input is empty, display all users
      setFilterUser(users);
    } else {
      // Perform case-insensitive filtering based on first name or last name
      setFilterUser(
        users.filter((user) => {
          const firstName = user.user.firstname.toLowerCase();
          const lastName = user.user.lastname.toLowerCase();
          const searchTerm = search.toLowerCase();
          return firstName.includes(searchTerm) || lastName.includes(searchTerm);
        })
      );
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleSubmit(); // Call the submit handler
    }
  };

  return (
    <div className="mb-3 px-2">
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
        <input
          type="text"
          className="px-2 searchMsg"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            // Debounce the search input if needed
            handleSubmit();
          }}
          onKeyDown={handleKeyPress}
        />
        {/* <button
          type="submit"
          className="btn btn-circle bg-green-600 text-white"
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button> */}
      </form>
    </div>
  );
};

export default SearchInput;
