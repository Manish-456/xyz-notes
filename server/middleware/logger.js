const { format } = require("date-fns");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");

const folderPath = path.join(__dirname, "..", "logs");

const logEvents = async (message, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  if (!fs.existsSync(folderPath)) {
    await fsPromises.mkdir(folderPath);
  }
  await fsPromises.appendFile(
    path.join(__dirname, "..", "logs", fileName),
    logItem
  );
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}}`, "reqlog.log");
  next();
};

module.exports = {
  logger,
  logEvents,
};
