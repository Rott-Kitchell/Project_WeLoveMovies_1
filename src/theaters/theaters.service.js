const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

async function listMoviesByTheater(theater_id) {
  return await knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.theater_id": theater_id });
}

function listTheaterByMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id });
}

function listAllTheaters() {
  return knex("theaters as t")
    .orderBy("t.name")
    .then((data) =>
      Promise.all(
        data.map((theater) => {
          return listMoviesByTheater(theater.theater_id).then((array) => {
            const results = {
              ...theater,
              movies: array,
            };

            return results;
          });
        })
      )
    );
}

module.exports = {
  listTheaterByMovie,
  listAllTheaters,
};
