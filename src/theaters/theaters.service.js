const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

function listTheaterByMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id });
}

function listAllTheaters() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*")
    .orderBy("t.name");
}

module.exports = {
  listTheaterByMovie,
  listAllTheaters,
};
