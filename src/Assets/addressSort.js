import {
  FIRST_NAME_A_Z,
  FIRST_NAME_Z_A,
  LAST_NAME_A_Z,
  LAST_NAME_Z_A
} from "../Assets/stringConstant/stringConstant";

export const sorts = [
  {
    value: { sortBy: "firstName", orderBy: "asc" },
    displayName: FIRST_NAME_A_Z
  },
  {
    value: { sortBy: "firstName", orderBy: "desc" },
    displayName: FIRST_NAME_Z_A
  },
  {
    value: { sortBy: "lastName", orderBy: "asc" },
    displayName: LAST_NAME_A_Z
  },
  {
    value: { sortBy: "lastName", orderBy: "desc" },
    displayName: LAST_NAME_Z_A
  }
];
