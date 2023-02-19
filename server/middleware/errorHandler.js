const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}${req.headers.origin}}`,
    "errlog.log"
  );
  const status = res.statusCode ? res.statusCode : 500; // server error;
  res.status(status);
  res.json({ message: err.message, isError : true });
};

module.exports = errorHandler;
