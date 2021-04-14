const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function list(movie_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ movie_id })
    .then((data) => {
      return data.map((set) => {
        const newSet = addCritic(set);
        return newSet;
      });
    });
}

function update(updatedReview) {
  const reviewId = updatedReview.review_id;
  console.log(reviewId);
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(review_id) {
  return knex("reviews").select("*").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};
