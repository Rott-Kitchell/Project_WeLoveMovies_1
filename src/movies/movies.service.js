const knex = require("../db/connection");

function list() {
  return knex("movies")
    .select(
      "movie_id as id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    )
    .groupBy("id")
    .orderBy("id");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .where({ "mt.is_showing": true })
    .groupBy("id")
    .orderBy("id");
}

function read(movie_id) {
  return knex("movies as m").select("m.*").where({ movie_id });
}

module.exports = {
  list,
  listShowing,
  read,
};
