const createBlogPost = async (req,res) =>{
    res.send('Create blog post');
}

const getBlogPost = async (req,res) =>{
    res.send("get Blog posts");    
}

const deleteBlogPost = async (req,res) =>{
    res.send("delete blog post");
}

const updateBlogPost = async (req,res) => {
    res.send("update blog post");
}

module.exports = {
    UPDATEBLOGPOST:updateBlogPost,
    GETBLOGPOST:getBlogPost,
    CREATEBLOGPOST:createBlogPost,
    DELETEBLOGPOST:deleteBlogPost
}