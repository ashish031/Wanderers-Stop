const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");
const {isLoggedIn,isAuthor,validateCampground} = require("../middleware");
const multer = require("multer");
const {storage} = require("../cloudinary");
const upload = multer({storage});

//index route
router.get('/', catchAsync(campgrounds.index));


//new page route
router.get('/new', isLoggedIn,campgrounds.renderNewForm)

//adding campground route 
router.post('/', isLoggedIn,upload.array("image"),validateCampground, catchAsync(campgrounds.createCampground))

//show page route
router.get('/:id', catchAsync(campgrounds.showCampground));

//edit page
router.get('/:id/edit', isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm))

//update route
router.put('/:id', isLoggedIn,isAuthor,upload.array("image"),validateCampground, catchAsync(campgrounds.updateCampground));

//delete route
router.delete('/:id', isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground));

module.exports = router;