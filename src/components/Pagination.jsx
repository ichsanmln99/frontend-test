import PropTypes from "prop-types";

function pagination({ pagination, onPageChange, maxPageNumber }) {
  function createPaginationPageNumber() {
    const pageNumber = [];
    const remainPage = getRemainPage();
    const totalNumber = getTotalNumber();

    let startNumber = getStartNumber(remainPage);

    for (let i = 0; i < totalNumber; i++) {
      const number = startNumber;

      pageNumber.push(
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={number === pagination.currentPage ? "active" : ""}
        >
          {number}
        </button>
      );
      startNumber++;
    }

    return pageNumber;
  }

  function getTotalNumber() {
    const totalPagesGreaterThanMax = pagination.totalPages > maxPageNumber;

    return totalPagesGreaterThanMax ? maxPageNumber : pagination.totalPages;
  }

  function getRemainPage() {
    return pagination.totalPages - pagination.currentPage;
  }

  function getStartNumber(remainPage) {
    const totalPagesEqualLowerThanMax = pagination.totalPages < maxPageNumber;
    const remainPageLowerThanMax = remainPage < maxPageNumber;

    if (totalPagesEqualLowerThanMax) {
      return (
        pagination.totalPages - (pagination.totalPages % maxPageNumber) + 1
      );
    } else if (remainPageLowerThanMax) {
      return pagination.totalPages - maxPageNumber + 1;
    } else {
      return pagination.currentPage;
    }
  }

  return (
    <div className="pagination">
      <button
        disabled={pagination.currentPage === 1}
        onClick={() => onPageChange(pagination.currentPage - 1)}
      >
        {"<"}
      </button>

      {createPaginationPageNumber()}

      <button
        onClick={() => onPageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        {">"}
      </button>
    </div>
  );
}

pagination.propTypes = {
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
};

export default pagination;
