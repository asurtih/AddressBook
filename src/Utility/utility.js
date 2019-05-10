import _ from "lodash";
/**
 * This function will return new array with list of items
 * to be displayed for given page number and page size.
 * @param {Array} items
 * @param {Number} pageNumber
 * @param {Number} pageSize
 */
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //to chain lodash method we need to convert item array
  //into lodash object
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
