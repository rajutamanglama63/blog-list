const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---");
  next();
};

const unKnownEndpoint = (req, res, next) => {
  res.status(404).send({ err: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }

  next();
  // return null;
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ err: "malforamtted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ err: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ err: err.message });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ err: err.message });
  }

  next(err);
};

module.exports = {
  requestLogger,
  unKnownEndpoint,
  errorHandler,
  tokenExtractor,
};
