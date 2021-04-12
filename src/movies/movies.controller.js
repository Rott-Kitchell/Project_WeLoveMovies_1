const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data =
    req.query.is_showing === "true"
      ? await moviesService.listShowing()
      : await moviesService.list();
  console.log(data);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
