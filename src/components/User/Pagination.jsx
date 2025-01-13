import PropTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, onPageClick }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageClick(index + 1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } dark:bg-gray-700 dark:text-white`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};



Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

export default Pagination;
