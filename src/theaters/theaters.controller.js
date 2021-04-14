const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { movie } = res.locals;
  const data = movie
    ? await theatersService.listTheaterByMovie(movie[0].movie_id)
    : await theatersService.listAllTheaters();
    console.log(data, "theaters")
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
