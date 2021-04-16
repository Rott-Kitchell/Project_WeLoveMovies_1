const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

// async function listMoviesByTheater(theater_id) {
//   return await knex("movies as m")
//     .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
//     .where({ "mt.theater_id": theater_id });
// }

function listTheaterByMovie(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ movie_id });
}

function listAllTheaters() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("*", "m.created_at as m_created_at", "m.updated_at as m_updated_at")
    .orderBy("t.name")
    .then((data) => {
      //console.log(data);
      const resultsArray = [];
      data.map((row) => {
        //console.log(row, "row");
        const movie = {
          movie_id: row.movie_id,
          title: row.title,
          runtime_in_minutes: row.runtime_in_minutes,
          rating: row.rating,
          description: row.description,
          image_url: row.image_url,
          created_at: row.m_created_at,
          updated_at: row.m_updated_at,
          is_showing: row.is_showing,
          theater_id: row.theater_id,
        };
        if (!resultsArray.some((r) => r.name === row.name)) {
          const theaterObj = {
            theater_id: row.theater_id,
            name: row.name,
            address_line_1: row.address_line_1,
            address_line_2: row.address_line_2,
            city: row.city,
            state: row.state,
            zip: row.zip,
            created_at: row.created_at,
            updated_at: row.updated_at,
            movies: [movie],
          };
          resultsArray.push(theaterObj);
        } else {
          resultsArray.map((r) => {
            if (
              r.name === row.name &&
              !r.movies.some((m) => m.title === movie.title)
            )
              r.movies.push(movie);
          });
        }
      });
      return resultsArray;
    });

  // return knex("theaters as t")
  //   .orderBy("t.name")
  //   .then((data) =>
  //     Promise.all(
  //       data.map((theater) => {
  //         return listMoviesByTheater(theater.theater_id).then((array) => {
  //           const results = {
  //             ...theater,
  //             movies: array,
  //           };
  //           return results;
  //         });
  //       })
  //     )
  //   );
}

module.exports = {
  listTheaterByMovie,
  listAllTheaters,
};
