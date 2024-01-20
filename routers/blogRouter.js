const express = require('express');

const BLOG = express.Router();

const {
    CREATEBLOGPOST,
    UPDATEBLOGPOST,
    GETBLOGPOST,
    DELETEBLOGPOST
} = require('../controllers.js/blogControllers');

BLOG.post("/",CREATEBLOGPOST);
BLOG.get("/",GETBLOGPOST);
BLOG.patch("/:id",UPDATEBLOGPOST);
BLOG.delete("/:id",DELETEBLOGPOST);

module.exports = {
    BLOGROUTER : BLOG,
}