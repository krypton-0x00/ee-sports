const customResourceResponse = {
  success: {
    statusCode: 200,
    message: "Request has been processed successfully.",
  },
  reqCreated: {
    statusCode: 201,
    message: "Record has been created successfully.",
  },
  fieldsEmpty: { statusCode: 400, message: "All fields are required." },
  recordNotFound: { statusCode: 404, message: "No record found." },
  unauthorized: { statusCode: 401, message: "unauthorized" },
  serverError: { statusCode: 500, message: "Internal server error." },
  reqValidationError: { statusCode: 422, message: "Data validation failed." },
};

export default customResourceResponse;
