import React from "react";

const Pagination = (props) => {
  console.log("count", props.count);
  console.log("active", props.active);
  console.log("listingPerPage", props.listingPerPage);
  const getPageNr = () => {
    let PageNr = 1;
    let content = null;
    const numberList = [];
    for (let i = 0; i < props.count; i += props.listingPerPage + 1) {
      const page = PageNr;
      if (PageNr === props.active) {
        content = (
          <div key={i} className="paginetion__number paginetion__active">
            {page}
          </div>
        );
      } else {
        content = (
          <div
            key={i}
            onClick={() => props.updateListingPagination(page)}
            className="paginetion__number"
          >
            {PageNr}
          </div>
        );
      }
      PageNr++;
      numberList.push(content);
    }
    console.log("hakan yüksel", numberList);
    return numberList;
  };

  return (
    <div className="pagination">
      <div
        onClick={() => props.previousPage()}
        className="paginetion__number_prev_next"
      >
        Previous
      </div>
      {getPageNr()}
      <div
        onClick={() => props.nextPage()}
        className="paginetion__number_prev_next"
      >
        Next
      </div>
    </div>
  );
};
export default Pagination;
