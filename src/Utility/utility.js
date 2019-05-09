import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //to chain lodash method we need to convert item array
  //into lodash object
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
