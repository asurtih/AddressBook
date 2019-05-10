import React from "react";
import { sorts } from "../../Assets/addressSort";
import * as stringConst from "../../Assets/stringConstant/stringConstant";
import styles from "./AddressSort.module.css";
import PropTypes from "prop-types";
/**
 * sort by dropdown
 *
 * @param {props} {
 *   onChangeSortCriteria,
 *   totalCount,
 *   pageSize,
 *   currentPage
 * }
 * @returns JSX element to display the sort by dropdown and the showing result count
 */
export const AddressSort = ({
  onChangeSortCriteria,
  totalCount,
  pageSize,
  currentPage
}) => {
  //calculate the start item number and end item number
  //and total items to be displayed in "showing result" section
  const startItemNumber = (currentPage - 1) * pageSize + 1;
  let endItemNumber = startItemNumber + pageSize - 1;
  if (totalCount < endItemNumber) {
    endItemNumber = totalCount;
  }
  const showingResult = `Showing result ${startItemNumber} - ${endItemNumber} of ${totalCount}`;

  return (
    <>
      <div className="row">
        <div className={["d-lg-none col", styles.showingResult].join(" ")}>
          {totalCount > 0 ? showingResult : ""}
        </div>
      </div>
      <div className="row">
        <div className={["col-4", "col-lg-1", styles["sort-label"]].join(" ")}>
          <label htmlFor="sort_by">{stringConst.SORT_BY}</label>
        </div>
        <div className={["col", styles["sort-container"]].join(" ")}>
          <div>
            <select
              id="sort_by"
              name="sortBy"
              className={styles["style-select"]}
              onChange={e => onChangeSortCriteria(e.target.value)}
            >
              {sorts.map((sort, index) => (
                <option key={index} value={JSON.stringify(sort.value)}>
                  {sort.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-none d-lg-block text-right col">
          {totalCount > 0 ? showingResult : ""}
        </div>
      </div>
    </>
  );
};

AddressSort.propTypes = {
  onChangeSortCriteria: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};
