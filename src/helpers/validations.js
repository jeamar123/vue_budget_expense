export const required = {
  rule(value) {
    return !!value.trim().length;
  },
  error: "This field is required",
};

export const email = {
  rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  error: "Please enter valid Email",
};

export const phone = {
  rule: /^\d{10,12}$/,
  error: "Please enter valid phone number",
};

// export const maxValue = {
//   rule(param, value) { return Number(value) <= Number(param) },
//   error(param) { return `Number should be less than ${param}` }
// };

export const password = {
  rule: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  error:
    "Password must be 8 characters long and contain an uppercase, lowercase, digit, and special character",
};

export const validate = (rules, value) => {
  let error = "";

  rules.forEach((ruleItem) => {
    let rule = ruleItem;
    // let param = "";

    // if (ruleItem.includes("|")) {
    //   rule = ruleItem.split("|")[0];
    //   param = ruleItem.split("|")[1];
    // }

    if (!error) {
      switch (rule) {
        case "required": {
          if (!required.rule(value)) error = required.error;
          break;
        }

        case "email": {
          if (!email.rule.test(value)) error = email.error;
          break;
        }

        case "phone": {
          if (!phone.rule.test(value)) error = phone.error;
          break;
        }

        // case 'maxValue': {
        //   if (!maxValue.rule(param, value)) error = maxValue.error(param);
        //   break;
        // }

        case "password": {
          if (!password.rule.test(value)) error = password.error;
          break;
        }

        default: {
          error = "";
          break;
        }
      }
    }
  });

  return error;
};

export const validateField = (field, formObj) => {
  // clearError(field, formObj);

  formObj[field].error = validate(formObj[field].rules, formObj[field].value);
};

export const validateForm = (formObj) => {
  // clearAllErrors(formObj);

  Object.keys(formObj).forEach((field) => {
    validateField(field, formObj);
  });

  return { error: Object.values(formObj).every((field) => !field.error), obj: formObj };
};

export const clearError = (field, formObj) => {
  if (formObj[field].error) formObj[field].error = "";
};

export const clearAllErrors = (formObj) => {
  Object.keys(formObj).forEach((field) => {
    clearError(field, formObj);
  });
};
