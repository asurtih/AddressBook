import React from "react";
import { Pagination } from "react-bootstrap";
import styles from "./CostcoPagination.module.css";
import _ from "lodash";

export const CostcoPagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  maxLink,
  onHandleNext,
  onHandlePrevious
}) => {
  const median = Math.ceil(Number(maxLink) / 2);
  const pagesCount = Math.ceil(Number(itemsCount) / Number(pageSize));
  let startPage = "";
  let endPage = "";

  if (pagesCount === 1) {
    return null;
  }

  if (currentPage <= median || pagesCount <= maxLink) {
    startPage = 1;
    endPage = pagesCount <= maxLink ? pagesCount : maxLink;
  } else {
    const calculatedEndPage = currentPage + (median - 1);
    endPage = calculatedEndPage <= pagesCount ? calculatedEndPage : pagesCount;
    startPage = endPage - (maxLink - 1);
  }
  const pageRange = _.range(startPage, endPage + 1);

  return (
    <div className={styles.costcoPagination}>
      <div
        className={[styles.paging, "col-sm-12", "col-md-8", "text-center"].join(
          " "
        )}
      >
        <Pagination size="sm">
          {currentPage > 1 ? (
            <Pagination.Item>
              <button
                type="button"
                className="btn btn-lnk p-1"
                onClick={() => onHandlePrevious("Previous")}
              >
                &lt;
              </button>
            </Pagination.Item>
          ) : null}
          {pageRange.map(page => (
            <Pagination.Item key={page} active={page === currentPage}>
              <button
                type="button"
                className="btn btn-lnk p-1"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </Pagination.Item>
          ))}
          {currentPage !== pagesCount ? (
            <Pagination.Item>
              <button
                type="button"
                className="btn btn-lnk p-1"
                onClick={() => onHandleNext("Next")}
              >
                &gt;
              </button>
            </Pagination.Item>
          ) : null}
        </Pagination>
      </div>
    </div>
  );
};
