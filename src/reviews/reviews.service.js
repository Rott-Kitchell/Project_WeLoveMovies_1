const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
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

function listAllReviews() {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .then((data) => {
      return data.map((set) => {
        const newSet = addCritic(set);
        return newSet;
      });
    });
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select(
          "r.*",
          "c.*",
          "c.critic_id as c_critic_id",
          "c.created_at as c_created_at",
          "c.updated_at as c_updated_at"
        )
        .where({ review_id: updatedReview.review_id })
        .first()
        .then(addCritic)
        .then((data) => data);
    });
}

function destroy(review_id) {
  return knex("reviews").select("*").where({ review_id }).del();
}

module.exports = {
  list,
  listAllReviews,
  read,
  update,
  delete: destroy,
};
