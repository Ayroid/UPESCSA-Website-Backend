import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { StatusCodes } from "http-status-codes";
import {
  BLOG_MESSAGES,
  SERVER_MESSAGES,
  USER_MESSAGES,
} from "../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEBLOGDB,
  READBLOGDB,
  UPDATEBLOGDB,
  DELETEBLOGDB,
} from "./database/blogDatabase.js";

// CONTROLLERS

const createBlog = async (req, res) => {
  try {
    const { blogTitle, blogAuthor, blogSummary, blogURL } = req.body;
    const query = { blogURL };

    const blogExists = await READBLOGDB(query, fields);
    if (blogExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(BLOG_MESSAGES.BLOG_ALREADY_EXISTS);
    }

    console.log(req.files["blogImg"][0].originalname);

    const blogImageURL = `${SERVER_URI}/images/blogs/${blogTitle}${path.extname(
      req.files["blogImg"][0].originalname
    )}`;

    const blog = await CREATEBLOGDB({
      blogTitle,
      blogAuthor,
      blogSummary,
      blogImageURL,
      blogURL,
    });

    if (blog) {
      console.log(BLOG_MESSAGES.BLOG_CREATED, { blog });
      return res.status(StatusCodes.CREATED).send({
        response: BLOG_MESSAGES.BLOG_CREATED,
        blogId: blog._id,
      });
    } else {
      console.log(BLOG_MESSAGES.ERROR_CREATING_BLOG, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_CREATING_BLOG, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readBlog = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const blog = await READBLOGDB(query, fields);

    if (blog.length > 0) {
      console.log(BLOG_MESSAGES.BLOG_FOUND, { blog });

      return res.status(StatusCodes.OK).send(blog);
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_FOUND, { blog });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(BLOG_MESSAGES.BLOG_NOT_FOUND);
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_READING_BLOG, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateBlog = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const message = await UPDATEBLOGDB(query, data, fields);
    if (message) {
      console.log(BLOG_MESSAGES.BLOG_UPDATED, { message });
      return res.status(StatusCodes.OK).send(message);
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_UPDATED, { message });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(BLOG_MESSAGES.BLOG_NOT_UPDATED);
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_UPDATING_BLOG, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const message = await DELETEBLOGDB(query);
    if (message) {
      console.log(BLOG_MESSAGES.BLOG_DELETED, { message });
      return res.status(StatusCodes.OK).send(BLOG_MESSAGES.BLOG_DELETED);
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_DELETED, { message });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(BLOG_MESSAGES.BLOG_NOT_DELETED);
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_DELETING_BLOG, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createBlog as CREATEBLOG,
  readBlog as READBLOG,
  updateBlog as UPDATEBLOG,
  deleteBlog as DELETEBLOG,
};
