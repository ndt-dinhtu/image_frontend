const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Search by image name..."
        />
      </div>
    );
  };
  
  export default SearchBar;
  