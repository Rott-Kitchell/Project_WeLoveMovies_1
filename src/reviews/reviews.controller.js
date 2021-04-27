const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await reviewsService.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  } else {
    next({ status: 404, message: "Review cannot be found." });
  }
}

async function list(req, res, next) {
  const { movie } = res.locals;
  const data = await reviewsService.list(movie[0].movie_id);
  res.json({ data });
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const newData = await reviewsService.update(updatedReview);
  res.json({ data: newData });
}

async function destroy(req, res) {
  await reviewsService.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
