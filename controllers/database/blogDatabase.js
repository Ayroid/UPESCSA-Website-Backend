import { BLOGMODEL } from "../../models/blogModel.js";
import { BLOG_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createBlogDB = async (data) => {
  try {
    const result = await BLOGMODEL(data).save();
    if (result !== null) {
      console.log(BLOG_MESSAGES.BLOG_CREATED, { userId: result._id });
      return result;
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_CREATED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_CREATING_BLOG, (data, error));
    return false;
  }
};

const readBlogDB = async (query, fields) => {
  try {
    const result = await BLOGMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(BLOG_MESSAGES.BLOG_READ, { userId: result[0].email });
      return result;
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_READING_BLOG, {
      query,
      error,
    });
    return false;
  }
};

const updateBlogDB = async (query, data, fields) => {
  try {
    console.log(query, data);
    const result = await BLOGMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(BLOG_MESSAGES.BLOG_UPDATED, { userId: result });
      return result;
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_UPDATED, { userId: result });
      return false;
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_UPDATING_BLOG, (query, data, error));
    return false;
  }
};

const deleteBlogDB = async (query) => {
  try {
    const result = await BLOGMODEL.findOneAndDelete(query);

    if (result) {
      console.log(BLOG_MESSAGES.BLOG_DELETED, { userId: result._id });
      return result;
    } else {
      console.log(BLOG_MESSAGES.BLOG_NOT_DELETED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(BLOG_MESSAGES.ERROR_DELETING_BLOG, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createBlogDB as CREATEBLOGDB,
  readBlogDB as READBLOGDB,
  updateBlogDB as UPDATEBLOGDB,
  deleteBlogDB as DELETEBLOGDB,
};
