const ResponseData = (
  statusCode: number,
  statusMessage: string,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (statusCode == 200 || statusCode == 201) {
    return {
      status: statusMessage,
      message: message,
      data: data,
    };
  }

  if (statusCode == 404) {
    return {
      status: statusMessage,
      message: message,
    };
  }

  if (statusCode == 400) {
    return {
      status: statusMessage,
      message: error,
    };
  }

  if (statusCode == 500) {
    if (error != null && error instanceof Error) {
      return {
        status: statusMessage,
        message: error.message,
        errors: error,
      };
    }

    return {
      status: statusMessage,
      message: statusMessage,
      errors: error,
    };
  }
};

export default { ResponseData };
