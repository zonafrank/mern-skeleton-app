const getUniqueErrorMessage = (error) => {
  let output;

  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndeOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " alraedy exists";
  } catch (error) {
    output = "Unique field already exists";
  }
  return output;
};

const getErrorMessage = (error) => {
  let message = "";
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errName in error.errors) {
      if (error.errors[errName].message) {
        message = error.errors[errName].message;
      }
    }
  }
  return message;
};

export default { getErrorMessage };
