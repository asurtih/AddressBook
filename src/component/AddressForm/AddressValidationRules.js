import * as stringConst from "../../Assets/stringConstant/stringConstant";

export const validate = values => {
  let errors = {};
  if (!values.email) {
    errors.email = stringConst.EMAIL_REQUIRED;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = stringConst.EMAIL_INVALID;
  }

  if (!values.firstName) {
    errors.firstName = stringConst.FIRST_NAME_REQUIRED;
  }

  if (!values.lastName) {
    errors.lastName = stringConst.LAST_NAME_REQUIRED;
  }

  if (!values.zipCode) {
    errors.zipCode = stringConst.ZIP_CODE_REQUIRED;
  } else if (!/^(\d{5}(-\d{4})?$)$/.test(values.zipCode)) {
    errors.zipCode = stringConst.ZIP_CODE_INVALID;
  }

  if (!values.city) {
    errors.city = stringConst.CITY_REQUIRED;
  }

  if (!values.state) {
    errors.state = stringConst.STATE_REQUIRED;
  }

  if (!values.phone) {
    errors.phone = stringConst.PHONE_REQUIRED;
  } else if (
    !/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
      values.phone
    )
  ) {
    errors.phone = stringConst.PHONE_INVALID;
  }
  if (!values.addressLine1) {
    errors.addressLine1 = stringConst.ADDRESS_REQUIRED;
  }

  return errors;
};
