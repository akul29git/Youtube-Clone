import ApiError from "../utils/apiError.js"

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  // use the real error, wrap it only if it isn't an ApiError
  const error =
    err instanceof ApiError
      ? err
      : new ApiError(err.statusCode || 500, err.message || "Internal Server Error", err.error || [])

  if (error.statusCode >= 500) {
    console.error(err)
  }

  return res.status(error.statusCode).json(error.tojson())
}

export { errorHandler }