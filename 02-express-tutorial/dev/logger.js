const logger = async (req, res, next) => {
  // "req, res, next" <-- will added automatically by express
  // we can catch "req, res, next", use them and
  // continue working with "next". THIS IS MIDDLEWARE

  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();

  console.log("logger is working!");
  console.log(method, url, time);

  next();
};

export default logger;
