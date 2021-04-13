const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties")

function listTheaterByMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id });
}

function listAllTheaters() {

}

module.exports = {
  listTheaterByMovie,
  listAllTheaters
};
