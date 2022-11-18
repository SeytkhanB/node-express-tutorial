class CustomAPIError extends Error {
  constructor(errMessage, statusCode) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

export { CustomAPIError, createCustomError };
