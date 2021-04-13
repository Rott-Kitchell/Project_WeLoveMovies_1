const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { movie } = res.locals;
  const data = movie
    ? await theatersService.listTheaterByMovie(movie[0].movie_id)
    : await theatersService.listTheaterByMovie(movie[0].movie_id);

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
