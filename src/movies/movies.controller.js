const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  console.log(req.params, req.body, req.query, "params");
  const movie = await moviesService.read(movieId);
  if (movie[0]) {
    res.locals.movie = movie;
    return next();
  } else {
    next({ status: 404, message: "Movie cannot be found." });
  }
}

async function list(req, res, next) {
  const data =
    req.query.is_showing === "true"
      ? await moviesService.listShowing()
      : await moviesService.list();
  res.json({ data });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data: data[0] });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  movieExists: asyncErrorBoundary(movieExists),
};
