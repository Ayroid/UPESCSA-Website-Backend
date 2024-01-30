const createCRS = async (req,res) => {
    res.send("createCRS");
}

const deleteCRS = async (req,res) => {
    res.send("deleteCRS");
};

const updateCRS = async (req,res) => {
    res.send("updateCRS");
};

const getCRS = async (req,res) => {
    res.send("getCRS");
};

export {
    createCRS as CREATECRS,
    getCRS as GETCRS,
    updateCRS as UPDATECRS,
    deleteCRS as DELETECRS,
};