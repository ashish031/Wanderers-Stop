const express = require("express");
const router = express.Router({mergeParams : true});
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware");
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError"); 


//adding review route
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))

//review delete route(campground also)
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports = router;