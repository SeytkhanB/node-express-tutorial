const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "seytkhan") {
    req.user = { name: "SEYTKHAN", id: 69 };
    next();
  } else {
    res.status(401).send("<h1>Unauthorized</h1>");
  }
};
export default authorize;
